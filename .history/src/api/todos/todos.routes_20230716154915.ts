import { NextFunction, Router } from "express";

import * as TodoHandlers from "./todos.handlers";
import { Todo } from "./todos.model";

const router = Router();

function validateRequest(validators) {
    return (req: Request, res: Response, next: NextFunction) => {

    }
};

router.get('/', TodoHandlers.findAll);
router.post(
    '/', 
    validateRequest({
        body: Todo,
    }), 
    TodoHandlers.createOne);

export default router;