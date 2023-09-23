// eslint-disable-next-line import/no-extraneous-dependencies --- intent to disable since msw is only for dev purpose
import { rest } from "msw";
import { faker } from "@faker-js/faker";

let users = [...new Array(100)].map((_, i) => ({
  id: `USER-${i}`,
  name: faker.person.fullName(),
  phoneNumber: faker.phone.number(),
  address: faker.location.streetAddress(),
  status: Math.random() > 0.7 ? "active" : "inactive",
  createdAt: faker.date.past().toISOString(),
}));

let companies = [...new Array(100)].map((_, i) => ({
  id: `COMPANY-${i}`,
  name: faker.company.name(),
  city: faker.location.city(),
  phoneNumber: faker.phone.number(),
}));

let cats = [...new Array(100)].map((_, i) => ({
  id: `CAT-${i}`,
  breed: faker.animal.cat(),
  name: faker.person.middleName(),
  sex: faker.person.sexType(),
  birthDate: faker.date.between({
    from: "2020-01-01T00:00:00.000Z",
    to: "2023-01-01T00:00:00.000Z",
  }),
}));

let dogs = [...new Array(100)].map((_, i) => ({
  id: `DOG-${i}`,
  breed: faker.animal.dog(),
  name: faker.person.middleName(),
  sex: faker.person.sexType(),
  birthDate: faker.date.between({
    from: "2020-01-01T00:00:00.000Z",
    to: "2023-01-01T00:00:00.000Z",
  }),
}));

export const handlers = [
  // Handles a POST
  rest.post(`/login`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.post(`/create`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.delete(`/users/:id`, (req, res, ctx) => {
    users = users.filter((c) => c.id !== req.params.id);
    return res(ctx.status(200));
  }),
  rest.delete(`/companies/:id`, (req, res, ctx) => {
    companies = companies.filter((c) => c.id !== req.params.id);
    return res(ctx.status(200));
  }),
  rest.delete(`/cats/:id`, (req, res, ctx) => {
    cats = cats.filter((c) => c.id !== req.params.id);
    return res(ctx.status(200));
  }),
  rest.delete(`/dogs/:id`, (req, res, ctx) => {
    dogs = dogs.filter((c) => c.id !== req.params.id);
    return res(ctx.status(200));
  }),

  // Handles a GET
  rest.get(`/users`, (req, res, ctx) => {
    return res(
      ctx.json({
        data: users,
      })
    );
  }),
  rest.get(`/companies`, (req, res, ctx) => {
    return res(
      ctx.json({
        data: companies,
      })
    );
  }),
  rest.get(`/cats`, (req, res, ctx) => {
    return res(
      ctx.json({
        data: cats,
      })
    );
  }),
  rest.get(`/dogs`, (req, res, ctx) => {
    return res(
      ctx.json({
        data: dogs,
      })
    );
  }),
];
