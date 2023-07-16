import * as z from 'zod';

import { db } from '../../db';

const Todo = z.object({ 
    content: z.string().min(1),
    done: z.boolean().default(false),
});

type Todo = z.infer<typeof Todo>;

export default Todo;

const Todos = db.collection('todos');