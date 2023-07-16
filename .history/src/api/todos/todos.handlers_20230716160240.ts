import { Response, Request, NextFunction } from "express";
import { Todo, TodoWithId, Todos } from "./todos.model";
import { ZodError } from "zod";
 
export async function findAll (req: Request, res: Response<TodoWithId[]>, next: NextFunction) {
    try {
        const result = await Todos.find();
        const todos = await result.toArray();
        res.json(todos);            
    } catch (error) {
        next(error);   
    }
}

export async function createOne (req: Request<{}, TodoWithId, Todo>, res: Response<TodoWithId>, next: NextFunction) {
    try {
        const validateResult = await Todo.parseAsync(req.body);
        const insertResult = await Todos.insertOne(req.body);
        res.status(201);
        if (!insertResult.acknowledged) throw new Error('Error inserting one todo.');
        res.json({
            _id: insertResult.insertedId,
            ...validateResult,
        });
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(422);
        }
        next(error);   
    }
}