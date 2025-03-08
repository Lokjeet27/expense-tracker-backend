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
