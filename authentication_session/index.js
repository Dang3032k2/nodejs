import express from "express";
import userRouter from "./routes/user.routes.js";
import db from "./db/index.js";
import { userSessions, usersTable } from "./db/schema.js";
import { eq } from "drizzle-orm";

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());

app.use(async function (req, res, next) {
  const sessionId = req.headers["session-id"];
  if (!sessionId) {
    return next();
  }
  const [data] = await db
    .select({
      id: userSessions.id,
      userId: userSessions.userId,
      name: usersTable.name,
      email: usersTable.email,
    })
    .from(userSessions)
    .rightJoin(usersTable, eq(userSessions.userId, usersTable.id))
    .where((table) => eq(table.id, sessionId));
  if (!data) {
    return next();
  }
  req.user = data;
  next();
});

app.get("/", (req, res) => {
  return res.json({ status: "Server is up and running" });
});

app.use("/user", userRouter);

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
