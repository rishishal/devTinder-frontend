import type { User } from "./user";

interface Connection {
  _id: string;
  sender: User;
  receiver: string;
  status: "interested" | "accepted" | "rejected" | "pending";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ConnectionWithDates {
  _id: string;
  sender: User;
  receiver: string;
  status: "interested" | "accepted" | "rejected" | "pending";
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
