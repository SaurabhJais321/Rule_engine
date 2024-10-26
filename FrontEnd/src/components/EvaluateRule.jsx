// src/components/EvaluateRuleForm.js

import React, { useState, useEffect } from "react";
import { evaluateRule } from "../api";

const EvaluateRuleForm = ({
  relode,
  setRelode,
  response1,
  setResponse1,
  response2,
  setResponse2,
}) => {
  const [ruleDescription, setRuleDescription] = useState("");
  const [availableRules, setAvailableRules] = useState([]);
  const [userData, setUserData] = useState({
    age: "",
    department: "",
    salary: "",
    experience: "",
  });
  const [response, setResponse] = useState(null);

  useEffect(() => {
    // Fetch all available rules
    const fetchRules = async () => {
      const res = await fetch("http://localhost:5000/api/rules"); // Assuming an endpoint to get rules
      const data = await res.json();
      setAvailableRules(data);
    };
    fetchRules();
  }, [relode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await evaluateRule(ruleDescription, userData);
    setRelode(!relode);
    setResponse(result);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div>
      <h2 style={{color:"darkgreen"}}>Evaluate Rule</h2>
      <div>
        <form  style={{ display: "flex", gap: "2px" }}>
          <select
            value={ruleDescription}
            onChange={(e) => setRuleDescription(e.target.value)}
            required
          >
            <option value="" disabled>
              Select a Rule
            </option>
            {availableRules.map((rule) => (
              <option key={rule._id} value={rule.description}>
                {rule.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={userData.age}
            onChange={handleChange}
            required
            style={{ height: "30px" }}
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={userData.department}
            onChange={handleChange}
            required
            style={{ height: "30px" }}
          />
          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={userData.salary}
            onChange={handleChange}
            required
            style={{ height: "30px" }}
          />
          <input
            type="number"
            name="experience"
            placeholder="Experience"
            value={userData.experience}
            onChange={handleChange}
            required
            style={{ height: "30px" }}
          />
        </form>
        <button
          type="submit"
          style={{ backgroundColor: "green", marginTop: "5px" }}
          onClick={handleSubmit}
        >
          Evaluate
        </button>
      </div>
      {response && <div style={{color:"green"}}>Evaluation Result: {JSON.stringify(response)}</div>}
    </div>
  );
};

export default EvaluateRuleForm;
