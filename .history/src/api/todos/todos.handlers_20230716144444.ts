import { Response, Request } from "express";
import { TodoWithId, Todos } from "./todos.model";

export async function findAll (req: Request, res: Response<TodoWithId[]>) {
    try {
        const result = await Todos.find();
        const todos = await result.toArray();
        res.json(todos);
            
    } catch (error) {
        
    }
}