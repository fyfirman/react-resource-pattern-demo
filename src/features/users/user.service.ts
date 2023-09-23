import { Response } from "~/interfaces/response";
import { axios } from "~/utils/axios-client";
import { User } from "~/features/users/user.interface";

const getUsers = async () => {
  const { data } = await axios.get<Response<User[]>>("/users");
  
  return data;
}

const userService = {
  getUsers
};

export default userService;
