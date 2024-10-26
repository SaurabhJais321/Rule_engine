const express = require("express");
const router = express.Router();
const ruleController = require("../controllers/ruleController");

router.get("", ruleController.getRules);
router.post("/create-rule", ruleController.createRule);
router.post("/combine-rules", ruleController.combineRules);
router.post("/evaluate-rule", ruleController.evaluateRule);
router.delete("/delete-rules", ruleController.deleteRules);
router.patch("/update-rules", ruleController.updteRule);

module.exports = router;
