import express from "express";
import { articleController } from "../controllers/article.controller.js";
import { blogController } from "../controllers/blog.controller.js";
import { essayController } from "../controllers/essay.controller.js";
import { newEmailController } from "../controllers/newEmail.controller.js";
import { noticeController } from "../controllers/notice.controller.js";
import { paragraphController } from "../controllers/paragraph.controller.js";
import { personalletterController } from "../controllers/personalletter.controller.js";
import { professionalletterController } from "../controllers/professionalletter.controller.js";
import { reportController } from "../controllers/report.controller.js";
import { resEmailController } from "../controllers/resEmail.controller.js";
import { storyController } from "../controllers/story.controller.js";
import { captiongeneratorController } from "../controllers/captiongenerator.controller.js";
import { ctageneratorController } from "../controllers/ctagenerator.controller.js";
import { faqgeneratorController } from "../controllers/faqgenerator.controller.js";
import { grammarcorrectorController } from "../controllers/grammarcorrector.controller.js";
import { humanizerController } from "../controllers/humanizer.controller.js";
import { imagegeneratorController } from "../controllers/imagegenerator.controller.js";
import { outlinegeneratorController } from "../controllers/outlinegenerator.cotroller.js";
import { paraphraserController } from "../controllers/paraphraser.controller.js";
import { readabilityimproverController } from "../controllers/readabilityimprover.controller.js";
import { replygeneratorController } from "../controllers/replygenerator.controller.js";
import { seometadescriptiongeneratorController } from "../controllers/seometadescriptiongenerator.controller.js";
import { seotaggeneratorController } from "../controllers/seotaggenerator.controller.js";
import { slogangeneratorController } from "../controllers/slogangenerator.controller.js";
import { summariserController } from "../controllers/summariser.controller.js";
import { titlegeneratorController } from "../controllers/titlegenerator.controller.js";
import { toneshifterController } from "../controllers/toneshifter.controller.js";
import { tweetgeneratorController } from "../controllers/tweetgenerator.controller.js";
import { articleImageGenController } from "../controllers/articleImageGen.controller.js";
import { detectorController } from "../controllers/detector.controller.js";
import upload from "../config/multer.js";

const generateRoute = express.Router();

generateRoute.post("/articleImage", articleImageGenController);
generateRoute.post("/article", articleController);
generateRoute.post("/blog", blogController);
generateRoute.post("/essay", essayController);
generateRoute.post("/newEmail", newEmailController);
generateRoute.post("/notice", noticeController);
generateRoute.post("/paragraph", paragraphController);
generateRoute.post("/personalletter", personalletterController);
generateRoute.post("/professionalletter", professionalletterController);
generateRoute.post("/report", reportController);
generateRoute.post("/resEmail", resEmailController);
generateRoute.post("/story", storyController);
generateRoute.post(
  "/caption",
  upload.single("image"),
  captiongeneratorController,
);
generateRoute.post("/detect", detectorController);
generateRoute.post("/cta", ctageneratorController);
generateRoute.post("/faq", faqgeneratorController);
generateRoute.post("/grammar/correct", grammarcorrectorController);
generateRoute.post("/humanize", humanizerController);
generateRoute.post("/image", imagegeneratorController);
generateRoute.post("/outline", outlinegeneratorController);
generateRoute.post("/paraphraser", paraphraserController);
generateRoute.post("/readability/improve", readabilityimproverController);
generateRoute.post("/reply", replygeneratorController);
generateRoute.post(
  "/seometadescription",
  seometadescriptiongeneratorController,
);
generateRoute.post("/seotag", seotaggeneratorController);
generateRoute.post("/slogan", slogangeneratorController);
generateRoute.post("/summary", summariserController);
generateRoute.post("/title", titlegeneratorController);
generateRoute.post("/toneshift", toneshifterController);
generateRoute.post("/tweet", tweetgeneratorController);

export default generateRoute;
