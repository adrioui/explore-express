import { Router, Response, Request } from "express";
import { Todo, TodoWithId, Todos } from "./todos.model";

const router = Router();

router.get('/', async (req: Request, res: Response<TodoWithId[]>) => {
    const result = await Todos.find()
    res.json(result.toArray());
});

export default router;