const mongoose = require("mongoose");

const ASTNodeSchema = new mongoose.Schema({
  type: { type: String, required: true }, // "operator" or "operand"
  value: { type: String }, // e.g., 'AND', 'OR' or 'age > 30'
  left: { type: mongoose.Schema.Types.Mixed },
  right: { type: mongoose.Schema.Types.Mixed },
});

const RuleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  ast: ASTNodeSchema,
  createdAt:{
    type:Date,
    default:Date.now()
  },
  modifiedAt:{
    type:Date,
  }
});

RuleSchema.pre("save", function (next) {
  if (this.isModified()) {
    this.modifiedAt = new Date();
  }
  next();
});

module.exports = mongoose.model("Rule", RuleSchema);
