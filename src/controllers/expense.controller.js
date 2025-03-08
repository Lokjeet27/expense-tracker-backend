const db = require("../models");
const Expense = db.Expense;
const Income = db.Income;

/**
 * @desc Add an expense (only if total expense does not exceed income)
 * @route POST /api/expenses
 */
exports.addExpense = async (req, res) => {
  try {
    const { type, amount } = req.body;
    const userId = req.user.id;

    const income = await Income.findOne({ where: { userId } });
    if (!income) return res.status(400).json({ error: "Please enter income first." });

    const totalExpense = await Expense.sum("amount", { where: { userId } });
    const newTotal = (totalExpense || 0) + parseFloat(amount);

    if (newTotal > income.amount) {
      return res.status(400).json({ error: "Expense cannot exceed the income." });
    }

    const expense = await Expense.create({ userId, type, amount });
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Get all expenses for the user
 * @route GET /api/expenses
 */
exports.getExpenses = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenses = await Expense.findAll({ where: { userId } });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Update an expense
 * @route PUT /api/expenses/:id
 */
exports.updateExpense = async (req, res) => {
  try {
    const { type, amount } = req.body;
    const { id } = req.params;
    const userId = req.user.id;

    const expense = await Expense.findOne({ where: { id, userId } });
    if (!expense) return res.status(404).json({ error: "Expense not found" });

    await expense.update({ type, amount });
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Delete an expense
 * @route DELETE /api/expenses/:id
 */
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const expense = await Expense.findOne({ where: { id, userId } });
    if (!expense) return res.status(404).json({ error: "Expense not found" });

    await expense.destroy();
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
