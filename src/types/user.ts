export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  emailId: string;
  bio: string;
  avatar: string | null;
  age: number;
  skills: string[];
  gender?: "male" | "female" | "other";
  createdAt: string;
  updatedAt: string;
}
