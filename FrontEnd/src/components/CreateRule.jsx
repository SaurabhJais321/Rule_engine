// src/components/CreateRuleForm.js

import React, { useState } from "react";
import { createRule } from "../api";
import { Light as Highlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CreateRuleForm = ({
  relode,
  setRelode,
  response1,
  setResponse1,
  response2,
  setResponse2,
}) => {
  const [ruleString, setRuleString] = useState("");
  const [ruleName, setRuleName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createRule(ruleString, ruleName);
    setRelode(!relode);
    setResponse1(result);
    setRuleString("");
    setRuleName("");
  };

  return (
    <div>
      <h2 style={{color:"blue"}}>Create a Rule</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Rule Name"
          value={ruleName}
          onChange={(e) => setRuleName(e.target.value)}
          required
          style={{ textAlign: "center" }}
        />
        <textarea
          placeholder="Enter rule string"
          value={ruleString}
          onChange={(e) => setRuleString(e.target.value)}
          required
          style={{ width: "500px", textAlign: "center" }}
        />
        <button type="submit" style={{backgroundColor:"blueviolet"}}>Create Rule</button>
      </form>
      {response1 && (
        <>
          <div>Creation Rule:</div>
          <Highlighter language="json" style={docco}>
            {JSON.stringify(response1, null, 2)}
          </Highlighter>
        </>
      )}
    </div>
  );
};

export default CreateRuleForm;
