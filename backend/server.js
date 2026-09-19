import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.1-pro-preview';
const GEMINI_FALLBACK_MODEL = process.env.GEMINI_FALLBACK_MODEL || 'gemini-3.1-flash-lite';
const prompt = 'You are a QA automation engineer. Write a complete, edge-case tested unit test suite using the Jest framework for the following JavaScript code. Return strictly the raw JavaScript code block. Do not include markdown formatting like ```javascript or any conversational text. Here is the code:\n\n';

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json({ limit: '1mb' }));

app.post('/api/generate-tests', async (req, res) => {
  const { code } = req.body ?? {};

  if (typeof code !== 'string' || code.trim().length === 0) {
    return res.status(400).json({ error: 'Please provide JavaScript code to evaluate.' });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'The Gemini API key is not configured on the server.' });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    let modelName = GEMINI_MODEL;
    let model = genAI.getGenerativeModel({ model: modelName });
    let result;

    try {
      result = await model.generateContent(`${prompt}${code}`);
    } catch (error) {
      if (error?.status !== 429 || GEMINI_FALLBACK_MODEL === GEMINI_MODEL) {
        throw error;
      }

      console.warn(`${GEMINI_MODEL} quota reached. Retrying with ${GEMINI_FALLBACK_MODEL}.`);
      modelName = GEMINI_FALLBACK_MODEL;
      model = genAI.getGenerativeModel({ model: modelName });
      result = await model.generateContent(`${prompt}${code}`);
    }

    const generatedTests = result.response.text().trim();

    return res.status(200).json({ tests: generatedTests });
  } catch (error) {
    console.error(`Test generation failed with model ${GEMINI_MODEL}:`, error);

    if (error?.status === 429) {
      return res.status(429).json({
        error: `Gemini quota is exhausted for ${GEMINI_MODEL} and ${GEMINI_FALLBACK_MODEL}. Check billing or use a key with available quota.`,
      });
    }

    if (error?.status === 404) {
      return res.status(404).json({
        error: `Gemini model "${GEMINI_MODEL}" is unavailable for this API key. Set GEMINI_MODEL to an available model.`,
      });
    }

    return res.status(500).json({
      error: 'Unable to generate tests right now. Check that GEMINI_MODEL is available for your API key.',
    });
  }
});

app.use((error, _req, res, _next) => {
  if (error instanceof SyntaxError && 'body' in error) {
    return res.status(400).json({ error: 'Request body must contain valid JSON.' });
  }

  console.error('Unhandled server error:', error);
  return res.status(500).json({ error: 'An unexpected server error occurred.' });
});

app.listen(PORT, () => {
  console.log(`TestGenie backend listening on http://localhost:${PORT}`);
});
