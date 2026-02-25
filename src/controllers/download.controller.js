import puppeteer from "puppeteer"; // npm i puppeteer
import convertDocx from "html-to-docx";
import markdownToSafeHtml from "../utils/markdown.js";

// GLOBAL BROWSER POOL - Put at TOP of file
let browser = null;
const getBrowser = async () => {
  if (!browser || browser.isClosed?.()) {
    browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--disable-gpu",
      ],
      defaultViewport: null,
    });
  }
  return browser;
};

const downloadPdf = async (req, res) => {
  let page = null;
  try {
    const { markdownContent } = req.body;
    const fullHtml = markdownToSafeHtml(markdownContent);

    // Set headers FIRST
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="document.pdf"');

    const browserInstance = await getBrowser();
    page = await browserInstance.newPage();

    // A4 viewport (794x1123 pixels)
    await page.setViewport({ width: 794, height: 1123 });

    // Load HTML with full CSS support
    await page.setContent(fullHtml, {
      waitUntil: ["networkidle0", "load"],
    });

    // Generate PDF with 1" margins
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "72px", // 1 inch
        right: "72px",
        bottom: "72px",
        left: "72px",
      },
    });

    res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error("PDF export error:", error);
    res.status(500).json({ error: "Failed to generate PDF" });
  } finally {
    if (page) {
      try {
        await page.close();
      } catch (e) {} // Safe cleanup
    }
  }
};

const downloadDocx = async (req, res) => {
  try {
    const { markdownContent } = req.body;
    const fullHtml = markdownToSafeHtml(markdownContent);
    const docxBuffer = await convertDocx(fullHtml);
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    );
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="document.docx"',
    );
    res.status(200).send(docxBuffer);
  } catch (error) {
    console.error("DOCX export error:", error);
    res.status(500).json({ error: "Failed to generate DOCX" });
  }
};

const downloadHtml = async (req, res) => {
  try {
    const { markdownContent } = req.body;
    const fullHtml = markdownToSafeHtml(markdownContent);
    const regex =
      /\[IMAGE_BLOCK\][\s\S]*?Alt:\s*(.+)\nPrompt:\s*([\s\S]*?)\n\[\/IMAGE_BLOCK\]/g;
    const cleanHtml = fullHtml.replace(regex, (match, alt, prompt) => {
      return `
    <div style="text-align:center;margin:1.5em 0;">
      <img src="" alt="${alt}" style="max-width:100%; height:auto; border-radius:6px;" />
      ${
        alt
          ? `<div style="font-size:13px;color:#666;margin-top:0.5em;font-style:italic;">${alt}</div>`
          : ""
      }
    </div>
  `;
    });
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Content-Disposition", 'attachment; filename="article.html"');
    res.status(200).send(cleanHtml);
  } catch (error) {
    console.error("Html export error:", error);
    res.status(500).json({ error: "Failed to generate HTML" });
  }
};

export { downloadDocx, downloadPdf, downloadHtml };
