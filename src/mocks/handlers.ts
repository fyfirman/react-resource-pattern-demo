// eslint-disable-next-line import/no-extraneous-dependencies --- intent to disable since msw is only for dev purpose
import { rest } from "msw";
import { faker } from "@faker-js/faker";
import getExampleResponse from "./responses/get-example.json";

export const handlers = [
  // Handles a POST
  rest.post(`/login`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.post(`/create`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.post(`/delete`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  // Handles a GET
  rest.get(`/example`, (req, res, ctx) => {
    return res(ctx.json(getExampleResponse));
  }),
  rest.get(`/users`, (req, res, ctx) => {
    const data = [...new Array(100)].map((_, i) => ({
      id: i,
      name: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
      address: faker.location.streetAddress(),
      status: Math.random() > 0.7 ? "active" : "inactive",
      createdAt: faker.date.past().toISOString(),
    }));

    return res(
      ctx.json({
        data,
      })
    );
  }),
  rest.get(`/companies`, (req, res, ctx) => {
    const data = [...new Array(100)].map((_, i) => ({
      id: i,
      name: faker.company.name(),
      city: faker.location.city(),
      phoneNumber: faker.phone.number(),
    }));

    return res(
      ctx.json({
        data,
      })
    );
  }),
  rest.get(`/cats`, (req, res, ctx) => {
    const data = [...new Array(100)].map((_, i) => ({
      id: i,
      breed: faker.animal.cat(),
      name: faker.person.middleName(),
      sex: faker.person.sexType(),
      birthDate: faker.date.between({
        from: "2020-01-01T00:00:00.000Z",
        to: "2023-01-01T00:00:00.000Z",
      }),
    }));

    return res(
      ctx.json({
        data,
      })
    );
  }),
];
