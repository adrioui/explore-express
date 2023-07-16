import { AnyZodObject } from "zod"

interface RequestValidators {
    body?: AnyZodObject,
    params?: AnyZodObject,
    query?: AnyZodObject,
};
  