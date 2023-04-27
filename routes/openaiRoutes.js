const express=require("express");
const { summaryController,paragraphController, chatBotController, jsConverterController, scifiImageController } = require("../controllers/openaiController");

const router=express.Router();

router.post('/sumarize-text',summaryController);
router.post('/paragraph',paragraphController);
router.post('/chatbot',chatBotController);
router.post('/js-convert',jsConverterController);
router.post('/scifi-image',scifiImageController);

module.exports=router;