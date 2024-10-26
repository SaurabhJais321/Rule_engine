// backend/controllers/ruleController.js
const Rule = require("../models/rule");
const {
  combineRulesAST,
  parseRuleString,
  evaluateRuleAST,
} = require("./helper");

// Create a rule from a string (create_rule)
exports.createRule = async (req, res) => {
  try {
    const { ruleString, name } = req.body;
    const ast = parseRuleString(ruleString); // Helper function to convert string to AST
    const rule = new Rule({ name, description: ruleString, ast });
    await rule.save();
    res.status(201).json(rule);
  } catch (error) {
    res.status(500).json({ error: "Error creating rule", error });
  }
};

// Combine multiple rules (combine_rules)
exports.combineRules = async (req, res) => {
  try {
    const { rulesDescription } = req.body;
    const rules = await Rule.find({ description: { $in: rulesDescription } });
    let CombinedRuleDescription = "";
    rules.map((rule, idx) => {
      if (idx == rules.length - 1) {
        CombinedRuleDescription += rule.description;
      } else {
        CombinedRuleDescription += rule.description + " AND ";
      }
    });
    const combinedAST = combineRulesAST(rules.map((rule) => rule.ast)); // Helper function to combine ASTs
    const combinedRule = new Rule({
      name: "Combined Rule",
      description: CombinedRuleDescription,
      ast: combinedAST,
    });
    await combinedRule.save();
    res.status(201).json(combinedRule);
  } catch (error) {
    res.status(500).json({ error: "Error combining rules", error });
  }
};

// Evaluate a rule (evaluate_rule)
exports.evaluateRule = async (req, res) => {
  try {
    const { ruleDescription, data } = req.body;
    const rule = await Rule.find({ description: ruleDescription });
    const result = evaluateRuleAST(rule[0].ast, data); 
    res.json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error evaluating rule", error });
  }
};

exports.getRules = async (req, res) => {
  try {
    const rules = await Rule.find({});
    res.json(rules);
  } catch (error) {
    res.status(500).json({ error: "error in getting rules", error });
  }
};

exports.deleteRules = async (req, res) => {
  try {
    const { ruleIds } = req.body;
    const deletedData = await Rule.deleteMany({ _id: { $in: ruleIds } });
    res.json({ message: "Rules Deleted", deletedData });
  } catch (err) {
    res.status(500).json({ error: "error in deleting rules", err });
  }
};

exports.updteRule = async (req, res) => {
  try {
    const { RuleId, ruleString } = req.body;
    const ast = parseRuleString(ruleString);
    const rule = await Rule.findById({ _id: RuleId });
    rule.description = ruleString;
    rule.ast = ast;
    await rule.save();
    res.status(200).json({ msg: "Rule Updated", data: rule });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error in Updating", error });
  }
};

// Helper functions to parse, combine, and evaluate AST will be defined below
