import { Response } from "~/interfaces/response";
import { axios } from "~/utils/axios-client";
import { User } from "~/features/users/user.interface";

const getUsers = async () => {
  const { data } = await axios.get<Response<User[]>>("/users");
  
  return data;
}
const deleteById = async (id: string) => {
  const { data } = await axios.delete<Response<User>>(`/users/${id}`);
  
  return data;
}

const userService = {
  getUsers,
  deleteById
};

export default userService;
