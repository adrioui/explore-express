import { MongoClient } from "mongodb";

const {
    MONGO_URI = 'connetion',
} = process.env

const client = new MongoClient(MONGO_URI);