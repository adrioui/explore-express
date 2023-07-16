import * as z from 'zod';

const Todo = z.object({ 
    content: z.string().min(1),
    done: z.boolean(),
});

const result = Todo.parse({
    content: '',

});
