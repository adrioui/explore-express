import { NextFunction, Router, Response } from "express";

import * as TodoHandlers from "./todos.handlers";
import { Todo } from "./todos.model";

const router = Router();

function validateRequest(validators) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await validators.body.parseAsync(req.body);
        } catch (error) {
            
        }
    };
};

router.get('/', TodoHandlers.findAll);
router.post(
    '/', 
    validateRequest({
        body: Todo,
    }), 
    TodoHandlers.createOne);

export default router;