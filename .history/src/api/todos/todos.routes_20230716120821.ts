import { Router, Response, Request } from "express";
import Todo from "./todos.models";

const router = Router();

router.get('/', (req: Request, res: Response<Todo[]>) => {
    res.json([{
        content: 'Learn Typescript!',
        done: false
    }]);
});

export default router;