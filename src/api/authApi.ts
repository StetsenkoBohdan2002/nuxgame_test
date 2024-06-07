import type { AxiosResponse } from 'axios';
import { axiosInstance } from './apiConfig';
import type { User, CurrentUser } from '@/types/User.type';

export async function loginUser(userData: CurrentUser): Promise<AxiosResponse> {
  try {
    const encodedUsername = encodeURIComponent(userData.username);
    const encodedPhone = encodeURIComponent(userData.phone);
    const response = await axiosInstance.get<User[]>(
      `/users?username=${encodedUsername}&phone=${encodedPhone}`
    );

    return response;
  } catch (error) {
    throw new Error(`Failed to login user: ${error}`);
  }
}

export async function registerUser(userData: User): Promise<AxiosResponse<User>> {
  try {
    const response = await axiosInstance.post<User>('/users', userData);
    return response;
  } catch (error) {
    throw new Error(`Failed to register user: ${error}`);
  }
}
