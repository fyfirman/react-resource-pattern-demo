import { Response } from "~/interfaces/response";
import { axios } from "~/utils/axios-client";
import { z } from "zod";
import { Cat } from "~/features/cats/cat.interface";

const SexType = z.enum(["female", "male"]);

export const catCreateSchema = z.object({
  breed: z.string(),
  name: z.string(),
  sex: SexType,
  birthDate: z.date(),
});

const createCat = async (payload: z.infer<typeof catCreateSchema>) => {
  const { data } = await axios.post<Response<Cat>>("/cats", payload);

  return data;
};
const updateCat = async (
  id: string,
  payload: z.infer<typeof catCreateSchema>
) => {
  const { data } = await axios.put<Response<Cat>>(`/cats/${id}`, payload);

  return data;
};
const getCats = async () => {
  const { data } = await axios.get<Response<Cat[]>>("/cats");

  return data;
};
const deleteById = async (id: string) => {
  const { data } = await axios.delete<Response<Cat>>(`/cats/${id}`);

  return data;
};

const catService = {
  createCat,
  updateCat,
  getCats,
  deleteById,
};

export default catService;
