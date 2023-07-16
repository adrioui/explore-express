import * as z from 'zod';

import { db } from '../../db';

const Todo = z.object({ 
    content: z.string().min(1),
    done: z.boolean().default(false),
});

export type Todo = z.infer<typeof Todo>;

export const Todos = db.collection<Todo>('todos');