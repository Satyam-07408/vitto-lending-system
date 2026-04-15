import React, { useState } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({
    ownerName: "",
    pan: "",
    businessType: "",
    monthlyRevenue: "",
    loanAmount: "",
    tenureMonths: "",
    loanPurpose: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "monthlyRevenue" ||
        e.target.name === "loanAmount" ||
        e.target.name === "tenureMonths"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://vitto-lending-system.onrender.com/api/applications",
        form
      );

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "API error");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "50px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        fontFamily: "Arial",
        backgroundColor: "#fff",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        MSME Lending Decision System
      </h1>

      <input
        style={inputStyle}
        name="ownerName"
        placeholder="Owner Name"
        onChange={handleChange}
      />

      <input
        style={inputStyle}
        name="pan"
        placeholder="PAN Number"
        onChange={handleChange}
      />

      <input
        style={inputStyle}
        name="businessType"
        placeholder="Business Type"
        onChange={handleChange}
      />

      <input
        style={inputStyle}
        type="number"
        name="monthlyRevenue"
        placeholder="Monthly Revenue"
        onChange={handleChange}
      />

      <input
        style={inputStyle}
        type="number"
        name="loanAmount"
        placeholder="Loan Amount"
        onChange={handleChange}
      />

      <input
        style={inputStyle}
        type="number"
        name="tenureMonths"
        placeholder="Tenure Months"
        onChange={handleChange}
      />

      <input
        style={inputStyle}
        name="loanPurpose"
        placeholder="Loan Purpose"
        onChange={handleChange}
      />

      <button
        onClick={handleSubmit}
        style={{
          width: "100%",
          padding: "12px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Check Decision
      </button>

      {result && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <h2>{result.decision}</h2>
          <p>
            <strong>Credit Score:</strong>{" "}
            {result.creditScore}
          </p>
          <p>
            <strong>Reasons:</strong>{" "}
            {result.reasonCodes.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;