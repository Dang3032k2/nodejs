import express from "express";
import db from "../db/index.js";
import { userSessions, usersTable } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { createHmac, randomBytes } from "node:crypto";
import jwt from "jsonwebtoken";

const router = express.Router();

router.patch("/", async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ error: "You are not logged in" });
  }
  const { name } = req.body;
  await db
    .update(usersTable)
    .set({ name })
    .where(eq(usersTable.id, user.userId));
  return res.json({ message: "success" });
});

router.get("/", async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ error: "You are not logged in" });
  }

  return res.json(user);
});

router.patch("/", async (req, res) => {
  const { name } = req.body;
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await db
    .select({ email: usersTable.email })
    .from(usersTable)
    .where((table) => eq(table.email, email));
  if (existingUser.length > 0) {
    return res
      .status(400)
      .json({ error: `User with email ${email} already exist` });
  }
  const salt = randomBytes(256).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");
  const user = await db
    .insert(usersTable)
    .values({ name, email, password: hashedPassword, salt })
    .returning({ id: usersTable.id });
  return res
    .status(201)
    .json({ status: "success", data: { userId: user[0].id } });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const [existingUser] = await db
    .select({
      id: usersTable.id,
      email: usersTable.email,
      salt: usersTable.salt,
      password: usersTable.password,
      name: usersTable.name,
    })
    .from(usersTable)
    .where((table) => eq(table.email, email));
  if (!existingUser) {
    return res
      .status(404)
      .json({ error: `user with email ${email} does not exists` });
  }
  const salt = existingUser.salt;
  const existingHash = existingUser.password;

  const newHash = createHmac("sha256", salt).update(password).digest("hex");
  if (newHash !== existingHash) {
    return res.status(400).json({ error: "Incorrect password" });
  }

  const payload = {
    id: existingUser.id,
    email: existingUser.email,
    name: existingUser.name,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return res.json({ status: "Success", token });
});

export default router;
