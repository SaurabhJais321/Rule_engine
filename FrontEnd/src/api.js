// src/api.js

const API_BASE_URL = "http://localhost:5000/api/rules"; // Backend URL

// Create a new rule
export const createRule = async (ruleString, name) => {
  const response = await fetch(`${API_BASE_URL}/create-rule`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ruleString, name }),
  });
  return response.json();
};

// Combine multiple rules
export const combineRules = async (rulesDescription) => {
  const response = await fetch(`${API_BASE_URL}/combine-rules`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({rulesDescription}),
  });
  return response.json();
};

// Evaluate a rule
export const evaluateRule = async (ruleDescription, data) => {
  console.log(ruleDescription)
  const response = await fetch(`${API_BASE_URL}/evaluate-rule`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ruleDescription, data }),
  });
  return response.json();
};

export const deleteRules=async(ruleIds)=>{
  const response=await fetch(`${API_BASE_URL}/delete-rules`,{
    method:"DELETE",
    headers:{
      "Content-Type":"application/json",
    },
    body: JSON.stringify({ruleIds}),
  });
  return response.json();
}

export const UpdateRule = async (RuleId,ruleString) => {
  console.log(ruleString);
  const response = await fetch(`${API_BASE_URL}/update-rules`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({RuleId,ruleString}),
  });
  return response.json();
};