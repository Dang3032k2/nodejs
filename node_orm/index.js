const dotenv = require("dotenv/config");
const db = require("./db");
const { userTable } = require("./drizzle/schema");

async function getAllUsers() {
  const users = await db.select().from(userTable);
  console.log(`Users in db`, users);
  return users;
}
async function createUser({ id, name, email }) {
  await db.insert(userTable).values({
    id,
    name,
    email,
  });
}
// createUser({ id: 1, name: "Dang", email: "dang@gmail.com" });
getAllUsers();
