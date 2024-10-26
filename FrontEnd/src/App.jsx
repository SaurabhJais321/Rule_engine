import "./App.css";
import CreateRuleForm from "./components/CreateRule";
import CombineRulesForm from "./components/CombineRules";
import EvaluateRuleForm from "./components/EvaluateRule";
import DeleteRulesForm from "./components/DeleteRules";
import { useState } from "react";
import UpdateRules from "./components/UpdateRules";

function App() {
  const[relode,setRelode]=useState(false);
  const [response1,setResponse1]=useState(null);
  const [response2,setResponse2]=useState(null);
  return (
    <>
      <div>
        <h1 style={{ color: "yellowgreen" }}>Rule Engine</h1>
      </div>
      <CreateRuleForm
        relode={relode}
        setRelode={setRelode}
        response1={response1}
        setrResponse1={setResponse1}
        response2={response2}
        setResponse2={setResponse2}
      />
      <hr />
      <CombineRulesForm
        relode={relode}
        setRelode={setRelode}
        response1={response1}
        setrResponse1={setResponse1}
        response2={response2}
        setResponse2={setResponse2}
      />
      <hr />
      <UpdateRules
        relode={relode}
        setRelode={setRelode}
        response1={response1}
        setrResponse1={setResponse1}
        response2={response2}
        setResponse2={setResponse2}
      />
      <hr />
      <EvaluateRuleForm
        relode={relode}
        setRelode={setRelode}
        response1={response1}
        setrResponse1={setResponse1}
        response2={response2}
        setResponse2={setResponse2}
      />
      <hr />
      <DeleteRulesForm
        relode={relode}
        setRelode={setRelode}
        response1={response1}
        setrResponse1={setResponse1}
        response2={response2}
        setResponse2={setResponse2}
      />
    </>
  );
}

export default App;
