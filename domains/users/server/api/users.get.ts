import { faker } from "@faker-js/faker";
import type { User } from "@/domains/users/types";
export default defineEventHandler(async (_event): Promise<User[]> => {
  const users = [];
  const numOfUsers = 50;

  for (let index = 0; index < numOfUsers; index++) {
    users.push({
      username: faker.internet.username(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
    });
  }
  return users;
});
