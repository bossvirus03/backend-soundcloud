import mongoose from "mongoose";

export interface IUser {
    _id: mongoose.Types.ObjectId;
    username: string;
    email: string;
    age: number;
    address: string;
    role: string;
}