import { Response } from "~/interfaces/response";
import { axios } from "~/utils/axios-client";
import { z } from "zod";
import { Dog } from "~/features/dogs/dog.interface";

const SexType = z.enum(["female", "male"]);

export const dogCreateSchema = z.object({
  breed: z.string(),
  name: z.string(),
  sex: SexType,
  birthDate: z.date(),
});

const createDog = async (payload: z.infer<typeof dogCreateSchema>) => {
  const { data } = await axios.post<Response<Dog>>("/dogs", payload);

  return data;
};
const getDogs = async () => {
  const { data } = await axios.get<Response<Dog[]>>("/dogs");

  return data;
};
const deleteById = async (id: string) => {
  const { data } = await axios.delete<Response<Dog>>(`/dogs/${id}`);

  return data;
};

const dogService = {
  createDog,
  getDogs,
  deleteById,
};

export default dogService;
