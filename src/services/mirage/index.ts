import { Factory, Model, createServer } from "miragejs";
import {faker} from '@faker-js/faker'

export type User = {
  name: string;
  email: string;
  createdAt: string;
};

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}),
    },

    factories: {
        user: Factory.extend({
            name() {
                return faker.person.fullName()
            },
            email() {return faker.internet.email().toLowerCase()},
            createdAt() { return faker.date.recent({days: 10}) },
        })
    },

    seeds(server) {
        server.createList('user', 10)
    },

    routes() {
      this.namespace = "api";
      this.timing = 3000;
      this.get("/users");
      this.post("/users");
      this.put("/users");
      this.delete("/users");

      this.namespace = "";
      this.passthrough()
    },
  });

  return server;
}
