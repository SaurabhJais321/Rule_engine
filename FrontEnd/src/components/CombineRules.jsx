// src/components/CombineRulesForm.js

import React, { useState, useEffect } from "react";
import { combineRules } from "../api";
import { Light as Highlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CombineRulesForm = ({
  relode,
  setRelode,
  response1,
  setResponse1,
  response2,
  setResponse2,
}) => {
  const [ruleIds, setRuleIds] = useState([]);
  const [availableRules, setAvailableRules] = useState([]);

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
    const result = await combineRules(ruleIds);
    setRelode(!relode);
    setResponse2(result);
    setRuleIds([]);
  };

  const handleCheckboxChange = (ruleDescription) => {
    setRuleIds((prev) =>
      prev.includes(ruleDescription)
        ? prev.filter((description) => description !== ruleDescription)
        : [...prev, ruleDescription]
    );
  };

  return (
    <div>
      <h2 style={{color:"blue"}}>Combine Rule's</h2>
      <form onSubmit={handleSubmit}>
        {availableRules.map((rule) => (
          <div key={rule._id}>
            <label style={{color:"burlywood"}}>
              <input
                type="checkbox"
                value={rule.description}
                onChange={() => handleCheckboxChange(rule.description)}
              />
              {rule.name}
            </label>
          </div>
        ))}
        <button type="submit" style={{backgroundColor:"blueviolet"}}>Combine Rules</button>
      </form>
      {response2 && (
        <>
          <div>Combined Rule:</div>
          <Highlighter language="json" style={docco}>
            {JSON.stringify(response2, null, 2)}
          </Highlighter>
        </>
      )}
    </div>
  );
};

export default CombineRulesForm;
