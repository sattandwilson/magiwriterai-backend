import express from "express";
import { downloadDocx, downloadHtml, downloadPdf } from "../controllers/download.controller.js";

const downloadRouter = express.Router();

downloadRouter.post("/pdf", downloadPdf);
downloadRouter.post("/docx", downloadDocx);
downloadRouter.post("/html", downloadHtml);

export default downloadRouter;
