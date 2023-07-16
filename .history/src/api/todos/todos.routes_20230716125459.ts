import { Router, Response, Request } from "express";
import { Todo, Todos } from "./todos.model";

const router = Router();

router.get('/', async (req: Request, res: Response<Todo[]>) => {
    res.json([{
        content: 'Learn Typescript!',
        done: false
    }]);
});

export default router;