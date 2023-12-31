import { ActiveModelSerializer, Factory, Model, Response, createServer } from "miragejs";
import {faker} from '@faker-js/faker'

export type User = {
  id: string;
  name: string;
  email: string;
  created_at: string;
};

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer
    },
    models: {
      user: Model.extend<Partial<User>>({})
    },

    factories: {
      user: Factory.extend({
        id() {
          return faker.string.uuid();
        },
        name() {
          return faker.person.fullName();
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        createdAt() {
          return faker.date.recent({ days: 365 });
        }
      })
    },

    seeds(server) {
      server.createList("user", 500);
    },

    routes() {
      this.namespace = "api";
      this.timing = 1000;
      this.get("users", function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;
        const total = schema.all("user").length;

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all("user"))
          .users.slice(pageStart, pageEnd);

        return new Response(
          200,
          { "x-total-count": String(total) },
          { users }
        );
      });
      this.get("/users/all", function (schema) {
        return schema.all("user")
      });
      this.get("/users/:id");
      this.post("/users");
      this.put("/users");
      this.delete("/users");

      this.namespace = "";
      this.passthrough('http://localhost:3333/*');
    }
  });
  
  return server;
}


