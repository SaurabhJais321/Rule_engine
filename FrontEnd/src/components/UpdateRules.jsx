// src/components/CombineRulesForm.js

import React, { useState, useEffect, useRef } from "react";
import { combineRules, UpdateRule } from "../api";
import { Light as Highlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const UpdateRules = ({
  relode,
  setRelode,
  response1,
  setResponse1,
  response2,
  setResponse2,
}) => {
  const [ruleId, setRuleId] = useState(null);
  const [availableRules, setAvailableRules] = useState([]);
  const [description,setDescription]=useState("");
  const textarea=useRef(null);
  const [updateValue,setUpdateValue]=useState([]);

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
    // const result = await combineRules(ruleIds);
    const ruleString = textarea.current.value;
    const result = await UpdateRule(ruleId,ruleString);
    setRelode(!relode);
    setUpdateValue(result);
    setRuleIds([]);
  };

  const handleCheckboxChange = (RuleId) => {
    setRuleId(RuleId);
    let rule=availableRules.filter((value)=> value._id===RuleId);
    console.log(rule);
    setDescription(rule[0].description);
  };

  return (
    <div>
      <h2 style={{ color: "blue" }}>Update Rule's</h2>
      <form onSubmit={handleSubmit}>
        {availableRules.map((rule) => (
          <div key={rule._id}>
            <label style={{ color: "burlywood" }}>
              <input
                type="radio"
                value={rule._id}
                name="Rules"
                onChange={() => handleCheckboxChange(rule._id)}
              />
              {rule.name}
            </label>
          </div>
        ))}
        <div style={{display:"flex",gap:"5px",justifyContent:"center"}}>
          <textarea
            value={description}
            style={{ width: "500px", height: "50px" }}
            ref={textarea}
            onChange={({value})=>setDescription(value)}
            id="RuleArea"
          />
          <button type="submit" style={{ backgroundColor: "blueviolet" }}>
            Update Rule
          </button>
        </div>
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

export default UpdateRules;
