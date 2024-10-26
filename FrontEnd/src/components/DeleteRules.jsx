// src/components/CombineRulesForm.js

import React, { useState, useEffect } from "react";
import { combineRules } from "../api";
import { deleteRules } from "../api";

const DeleteRulesForm = ({
  relode,
  setRelode,
  response1,
  setResponse1,
  response2,
  setResponse2,
}) => {
  const [ruleIds, setRuleIds] = useState([]);
  const [availableRules, setAvailableRules] = useState([]);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    // Fetch all available rules from the backend (implement API if needed)
    const fetchRules = async () => {
      const res = await fetch("http://localhost:5000/api/rules"); // Assuming an endpoint to get rules
      const data = await res.json();
      setAvailableRules(data);
    };
    fetchRules();
  }, [relode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await deleteRules(ruleIds);
    setRelode(!relode);
    setResponse(result);
    setResponse1(null);
    setResponse2(null);
    setRuleIds([]);
  };

  const handleCheckboxChange = (ruleId) => {
    setRuleIds((prev) =>
      prev.includes(ruleId)
        ? prev.filter((id) => id !== ruleId)
        : [...prev, ruleId]
    );
  };

  return (
    <div>
      <h2 style={{color:"darkred"}}>Delete Rules</h2>
      <form onSubmit={handleSubmit}>
        {availableRules.map((rule) => (
          <div key={rule._id}>
            <label style={{color:"orchid"}}>
              <input
                type="checkbox"
                value={rule._id}
                onChange={() => handleCheckboxChange(rule._id)}
              />
              {rule.name}
            </label>
          </div>
        ))}
        <button type="submit" style={{backgroundColor:"red"}}>Delete Rules</button>
      </form>
      {response && <div style={{color:"red"}}>Combined Rule: {JSON.stringify(response)}</div>}
    </div>
  );
};

export default DeleteRulesForm;
