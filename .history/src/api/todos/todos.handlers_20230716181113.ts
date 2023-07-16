import { Response, Request, NextFunction } from "express";
import { Todo, TodoWithId, Todos } from "./todos.model";
import { ZodError } from "zod";
import { ParamsWithId } from "../../interfaces/ParamsWithId"; 
import { ObjectId } from 'mongodb';

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

export async function findOne (req: Request<ParamsWithId, TodoWithId, {}>, res: Response<TodoWithId>, next: NextFunction) {
    try {
        const result = await Todos.findOne({
            _id: new ObjectId(req.params.id),
        });
        if (!result) {
            res.status(404);
            throw new Error(`Todo with id "${req.params.id}" not found.`);
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
}

export async function updateOne (req: Request<ParamsWithId, TodoWithId, Todo>, res: Response<TodoWithId>, next: NextFunction) {
    try {
        const result = await Todos.findOneAndUpdate({
            _id: new ObjectId(req.params.id),
        }, {
            $set: req.body,
        }, {
            returnDocument: 'after',
        });
        if (!result.value) {
            res.status(404);
            throw new Error(`Todo with id "${req.params.id}" not found.`);
        }
        res.json(result.value);
    } catch (error) {
        next(error);
    }
}

export async function deleteOne (req: Request<ParamsWithId, {}, {}>, res: Response<{}>, next: NextFunction) {
    try {
        const result = await Todos.findOneAndDelete({
            _id: new ObjectId(req.params.id),
        }, {}, {
            returnDocument: 'after',
        })
    } catch (error) {
        next(error);
    }
}