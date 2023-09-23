import { Response } from "~/interfaces/response";
import { axios } from "~/utils/axios-client";
import { Company } from "~/features/company/company.interface";
import { z } from "zod";

export const companyCreateSchema = z.object({
  name: z.string(),
  phoneNumber: z.string(),
  city: z.string(),
});

const createCompany = async (payload: z.infer<typeof companyCreateSchema>) => {
  const { data } = await axios.post<Response<Company>>("/companies", payload);

  return data;
};
const updateCompany = async (
  id: string,
  payload: z.infer<typeof companyCreateSchema>
) => {
  const { data } = await axios.put<Response<Company>>(
    `/companies/${id}`,
    payload
  );

  return data;
};
const getCompanies = async () => {
  const { data } = await axios.get<Response<Company[]>>("/companies");

  return data;
};
const deleteById = async (id: string) => {
  const { data } = await axios.delete<Response<Company>>(`/companies/${id}`);

  return data;
};

const companyService = {
  createCompany,
  updateCompany,
  getCompanies,
  deleteById,
};

export default companyService;
