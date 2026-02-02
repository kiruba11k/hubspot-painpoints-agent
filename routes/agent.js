import express from "express";
import { agentLimiter } from "../middleware/rateLimit.js";
import { fetchSegmentRecords } from "../services/fetchSegmentRecords.js";
import { extractPainPoints } from "../services/extractPainPoints.js";
import { summarizeSegmentInsights } from "../services/summarizeInsights.js";
import { generateMessaging } from "../services/generateMessaging.js";

const router = express.Router();

router.post("/run", agentLimiter, async (req, res) => {
  const { accessToken, mode, pipelineId, stages, metadata } = req.body;

  const dataset = await fetchSegmentRecords({
    accessToken,
    mode,
    pipelineId,
    stages
  });

  const painPoints = await extractPainPoints(dataset);
  const summary = await summarizeSegmentInsights(painPoints, metadata);
  const messaging = await generateMessaging(painPoints);

  res.json({
    sampledRecords: dataset.length,
    painPoints,
    summary,
    messaging
  });
});

export default router;
