import { NextFunction, Router, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

import * as TodoHandlers from "./todos.handlers";
import { Todo } from "./todos.model";

const router = Router();

interface RequestValidators {
    body?: AnyZodObject,
    params?: AnyZodObject,
    query?: AnyZodObject,
};

function validateRequest(validators: RequestValidators) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if validators.body{
                req.body = await validators.body.parseAsync(req.body);
            }
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(422);
            };
            next(error);
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