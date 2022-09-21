type Category = {
  id: number;
  name: string;
}

// type Category = "hobby" | "work" | "study" | "other";
type Priority = 1 | 2 | 3;

export interface Todo {
  id: string;
  title: string;
  description: string;
  category: number;
  priority: Priority;
  user: string;
}