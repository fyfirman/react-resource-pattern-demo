import { Response } from "~/interfaces/response";
import { axios } from "~/utils/axios-client";
import { User } from "~/features/users/user.interface";
import { z } from "zod";

export const userCreateSchema = z.object({
  name: z.string(),
  phoneNumber: z.string(),
  address: z.string(),
})

const createUser = async (payload: z.infer<typeof userCreateSchema>) => {
  const { data } = await axios.post<Response<User>>("/users", payload);
  
  return data;
}
const getUsers = async () => {
  const { data } = await axios.get<Response<User[]>>("/users");
  
  return data;
}
const deleteById = async (id: string) => {
  const { data } = await axios.delete<Response<User>>(`/users/${id}`);
  
  return data;
}

const userService = {
  createUser, 
  getUsers,
  deleteById
};

export default userService;
