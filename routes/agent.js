import express from "express";
import { fetchSegmentRecords } from "../services/fetchSegmentRecords.js";
import { extractPainPoints } from "../services/extractPainPoints.js";
import { summarizeSegmentInsights } from "../services/summarizeInsights.js";
import { generateMessaging } from "../services/generateMessaging.js";

const router = express.Router();

router.post("/run", async (req, res) => {
  const { accessToken, mode, listId, pipelineId, stages, metadata } = req.body;

  const dataset = await fetchSegmentRecords({
    accessToken,
    mode,
    listId,
    pipelineId,
    stages
  });

  const painPoints = await extractPainPoints(dataset);
  const summary = await summarizeSegmentInsights(painPoints, metadata);
  const messaging = await generateMessaging(painPoints);

  res.json({
    painPoints,
    summary,
    messaging
  });
});

export default router;
