import { NewTodo } from '@/types/Todo.type.ts';
import { axiosInstance } from './apiConfig';

export async function getTodos() {
  try {
    const response = await axiosInstance.get('/todos');
    return response;
  } catch (error) {
    throw new Error(`Failed to get todos: ${error}`);
  }
}

export async function addNewTodo(todoData: NewTodo) {
  try {
    const response = await axiosInstance.post('/todos', todoData);
    return response;
  } catch (error) {
    throw new Error(`Failed to add new todo: ${error}`);
  }
}
