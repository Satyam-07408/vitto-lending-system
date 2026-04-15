const {
  calculateDecision,
} = require("../services/decisionService");

exports.createApplication = (req, res) => {
  try {
    const result = calculateDecision(req.body);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};