import { MongoClient } from "mongodb";

const {
    MONGO_URI,
} = process.env

const client = new MongoClient();