// Parse rule string to AST
function parseRuleString(ruleString) {
  const tokens = ruleString.match(/\w+|>|<|=|AND|OR|\(|\)/g);
  let index = 0;

  function parseExpression() {
    let left = parseTerm();
    while (tokens[index] === "AND" || tokens[index] === "OR") {
      const operator = tokens[index++];
      const right = parseTerm();
      left = { type: "operator", left, right, value: operator };
    }
    return left;
  }

  function parseTerm() {
    if (tokens[index] === "(") {
      index++;
      const expression = parseExpression();
      index++;
      return expression;
    }
    const field = tokens[index++];
    const operator = tokens[index++];
    const value = tokens[index++];
    return { type: "operand", value: `${field} ${operator} ${value}` };
  }

  return parseExpression();
}

// Combine multiple ASTs into one
function combineRulesAST(rules) {
  if (rules.length === 1) return rules[0];
  let combinedAST = {
    type: "operator",
    left: rules[0],
    right: rules[1],
    value: "AND",
  };
  for (let i = 2; i < rules.length; i++) {
    combinedAST = {
      type: "operator",
      left: combinedAST,
      right: rules[i],
      value: "AND",
    };
  }
  return combinedAST;
}

// Evaluate AST against user data
function evaluateRuleAST(ast, data) {
  if (ast.type === "operator") {
    const leftResult = evaluateRuleAST(ast.left, data);
    const rightResult = evaluateRuleAST(ast.right, data);
    if (ast.value === "AND") return leftResult && rightResult;
    if (ast.value === "OR") return leftResult || rightResult;
  } else if (ast.type === "operand") {
    const [field, operator, threshold] = ast.value.split(" ");
    if (operator === ">") return data[field] > Number(threshold);
    if (operator === "<") return data[field] < Number(threshold);
    if (operator === "=") return data[field] == threshold.replace(/'/g, "");
  }
  return false;
}

module.exports = { parseRuleString, combineRulesAST, evaluateRuleAST };
