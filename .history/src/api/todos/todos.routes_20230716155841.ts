import { NextFunction, Router, Response, Request } from "express";
import { AnyZodObject, ZodError } from "zod";

import * as TodoHandlers from "./todos.handlers";
import { Todo } from "./todos.model";

const router = Router();

interface RequestValidators {
    body?: AnyZodObject,
    params?: AnyZodObject,
    query?: AnyZodObject,
};

router.get('/', TodoHandlers.findAll);
router.post(
    '/', 
    validateRequest({
        body: Todo,
    }), 
    TodoHandlers.createOne);

export default router;