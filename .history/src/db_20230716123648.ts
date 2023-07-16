import { MongoClient } from "mongodb";

const {
    MONGO_URI = 'connection',
} = process.env

const client = new MongoClient(MONGO_URI);