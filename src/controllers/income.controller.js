const db = require("../models");
const Income = db.Income;

/**
 * @desc Add user's income (only once)
 * @route POST /api/income
 */
exports.addIncome = async (req, res) => {
  try {
    const existingIncome = await Income.findOne({ where: { userId: req.user.id } });

    if (existingIncome) {
      return res.status(400).json({ error: "You can only enter income once." });
    }

    const income = await Income.create({ userId: req.user.id, amount: req.body.amount });
    res.status(201).json(income);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Update user's income
 * @route PUT /api/income
 */
exports.updateIncome = async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user.id;

    if (amount < 0) {
      return res.status(400).json({ error: "Income cannot be negative" });
    }

    const income = await Income.findOne({ where: { userId } });

    if (!income) {
      return res.status(404).json({ error: "Income not found. Use POST to create." });
    }

    income.amount = amount;
    await income.save();

    return res.status(200).json(income);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * @desc Get income of the logged-in user
 * @route GET /api/income
 */
exports.getIncome = async (req, res) => {
  try {
    const userId = req.user.id;
    const income = await Income.findOne({ where: { userId } });

    if (!income) {
      return res.status(404).json({ error: "Income not found. Use POST to create." });
    }

    return res.status(200).json(income);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
