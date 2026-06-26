import { generateLogoBriefPdf, validateSubmission } from "./lib/logoBriefPdf.js";
import { sendLogoBriefEmail } from "./lib/sendLogoBriefEmail.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  try {
    const data = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const errors = validateSubmission(data);

    if (Object.keys(errors).length) {
      return res.status(400).json({ error: "Validation failed.", errors });
    }

    const pdfBytes = await generateLogoBriefPdf(data);
    const { filename } = await sendLogoBriefEmail({ data, pdfBytes });

    return res.status(200).json({
      ok: true,
      message: "Your logo brief was submitted successfully.",
      filename,
    });
  } catch (error) {
    console.error("Logo brief submission failed:", error);
    return res.status(500).json({
      error: error.message || "Unable to submit logo brief right now.",
    });
  }
}
