export interface User {
  id: string;
  name: string;
  phoneNumber: string;
  address: string;
  status: "active" | "inactive";
  createdAt: string;
}
