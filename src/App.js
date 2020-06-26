import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { localeformat } from "./utils";

function App() {
  let [bankAccount, setBankAccount] = useState("");
  let [groww, setGroww] = useState("");
  let [fd, setFd] = useState("");
  let [pf, setPf] = useState("");
  let [other, setOther] = useState("");
  let [result, setResult] = useState("");

  const calculate = (event) => {
    event.preventDefault();
    groww = groww.replace(/,/g, "");
    bankAccount = bankAccount.replace(/,/g, "");
    fd = fd.replace(/,/g, "");
    pf = pf.replace(/,/g, "");
    other = other.replace(/,/g, "");
    const formattedResult = localeformat(
      String(+bankAccount + +groww + +fd + +pf + +other)
    );
    setResult(formattedResult + " Rs");
  };

  const clear = () => {
    setGroww("");
    setBankAccount("");
    setPf("");
    setFd("");
    setOther("");
    setResult("");
  };

  return (
    <div className="container App">
      <h3>Your Financial Calculator</h3>
      <form>
        <div className="form-group">
          <label htmlFor="groww">GROWW</label>
          <input
            onChange={(event) => setGroww(localeformat(event.target.value))}
            type="text"
            className="form-control"
            id="groww"
            placeholder="Enter groww amount"
            value={groww}
          />
        </div>
        <div className="form-group">
          <label htmlFor="saving_bank_account">SAVING BANK ACCOUNT</label>
          <input
            onChange={(event) =>
              setBankAccount(localeformat(event.target.value))
            }
            type="text"
            className="form-control"
            id="saving_bank_account"
            placeholder="Enter Saving Bank Account"
            value={bankAccount}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fd">FD</label>
          <input
            onChange={(event) => setFd(localeformat(event.target.value))}
            type="text"
            className="form-control"
            id="fd"
            placeholder="Enter FD"
            value={fd}
          />
        </div>
        <div className="form-group">
          <label htmlFor="PF">PF</label>
          <input
            onChange={(event) => setPf(localeformat(event.target.value))}
            type="text"
            className="form-control"
            id="PF"
            placeholder="Enter PF"
            value={pf}
          />
        </div>
        <div className="form-group">
          <label htmlFor="other">OTHERS</label>
          <input
            onChange={(event) => setOther(localeformat(event.target.value))}
            type="text"
            className="form-control"
            id="other"
            placeholder="Enter Others"
            value={other}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(event) => calculate(event)}
        >
          Calculate
        </button>{" "}
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => clear()}
        >
          Clear
        </button>
        <hr />
        <h3>{result}</h3>
      </form>
    </div>
  );
}

export default App;
