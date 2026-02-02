import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import dotenv from "dotenv";
import agentRoutes from "./routes/agent.js";

dotenv.config();

const app = express();

app.use(helmet());
app.use(bodyParser.json());

app.use("/agent", agentRoutes);

app.get("/health", (_, res) => res.send("OK"));

app.listen(process.env.PORT, () => {
  console.log("Pain Points Agent running");
});
