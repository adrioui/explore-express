import { Response, Request, NextFunction } from "express";
import { Todo, TodoWithId, Todos } from "./todos.model";
import { ZodError } from "zod";
import { ParamsWithId } from "../../interfaces/ParamsWithId"; 

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
        const insertResult = await Todos.insertOne(req.body);
        res.status(201);
        if (!insertResult.acknowledged) throw new Error('Error inserting one todo.');
        res.json({
            _id: insertResult.insertedId,
            ...req.body,
        });
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(422);
        }
        next(error);   
    }
}