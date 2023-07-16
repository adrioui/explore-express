async (req: Request, res: Response<TodoWithId[]>) => {
    const result = await Todos.find();
    const todos = await result.toArray();
    res.json(todos);
}