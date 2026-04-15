const calculateDecision = (data) => {
  const {
    ownerName,
    pan,
    businessType,
    monthlyRevenue,
    loanAmount,
    tenureMonths,
    loanPurpose,
  } = data;

  // Required field validation
  if (
    !ownerName ||
    !pan ||
    !businessType ||
    !monthlyRevenue ||
    !loanAmount ||
    !tenureMonths ||
    !loanPurpose
  ) {
    throw new Error("MISSING_REQUIRED_FIELDS");
  }

  // PAN validation
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  if (!panRegex.test(pan)) {
    throw new Error("INVALID_PAN");
  }

  // Numeric validation
  if (
    monthlyRevenue <= 0 ||
    loanAmount <= 0 ||
    tenureMonths <= 0
  ) {
    throw new Error("INVALID_NUMERIC_VALUES");
  }

  // Fraud / inconsistency check
  if (loanAmount > monthlyRevenue * 20) {
    throw new Error("DATA_INCONSISTENCY");
  }

  let score = 700;
  let reasons = [];

  const emi = loanAmount / tenureMonths;
  const ratio = monthlyRevenue / emi;
  const loanMultiple = loanAmount / monthlyRevenue;

  // Revenue to EMI ratio scoring
  if (ratio > 5) {
    score += 100;
    reasons.push("GOOD_REVENUE_RATIO");
  } else if (ratio >= 3) {
    score += 50;
    reasons.push("MODERATE_REVENUE_RATIO");
  } else if (ratio < 2) {
    score -= 150;
    reasons.push("LOW_REVENUE");
  }

  // Loan amount multiple scoring
  if (loanMultiple > 5) {
    score -= 200;
    reasons.push("HIGH_LOAN_RATIO");
  } else if (loanMultiple > 2) {
    score -= 50;
    reasons.push("MODERATE_LOAN_RATIO");
  }

  // Tenure risk
  if (tenureMonths < 6) {
    score -= 50;
    reasons.push("SHORT_TENURE_RISK");
  }

  if (tenureMonths > 48) {
    score -= 50;
    reasons.push("LONG_TENURE_RISK");
  }

  // Final decision
  const decision =
    score >= 750 ? "APPROVED" : "REJECTED";

  return {
    decision,
    creditScore: score,
    reasonCodes: reasons,
  };
};

module.exports = { calculateDecision };