export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  favorite: boolean;
}
export interface NewTodo {
  userId: number | string;
  title: string;
}


