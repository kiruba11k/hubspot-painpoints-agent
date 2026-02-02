import express from "express";
import bodyParser from "body-parser";
import agentRoutes from "./routes/agent.js";

const app = express();
app.use(bodyParser.json());

app.use("/agent", agentRoutes);

app.listen(3000, () => {
  console.log("Pain Points Agent running on port 3000");
});
