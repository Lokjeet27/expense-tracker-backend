const db = require("../models");
const Expense = db.Expense;

/**
 * @desc Add an expense for the user
 * @route POST /api/expenses
 */
exports.addExpense = async (req, res) => {
  try {
    const { type, amount } = req.body;
    const userId = req.user.id;

    if (amount <= 0) {
      return res.status(400).json({ error: "Expense amount must be greater than zero." });
    }

    const expense = await Expense.create({ userId, type, amount });
    return res.status(201).json(expense);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * @desc Get all expenses for a user
 * @route GET /api/expenses
 */
exports.getExpenses = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenses = await Expense.findAll({ where: { userId } });

    return res.status(200).json(expenses);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * @desc Get a single expense by ID
 * @route GET /api/expenses/:id
 */
exports.getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findOne({ where: { id, userId: req.user.id } });

    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    return res.status(200).json(expense);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * @desc Update an expense by ID
 * @route PUT /api/expenses/:id
 */
exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, amount } = req.body;

    const expense = await Expense.findOne({ where: { id, userId: req.user.id } });

    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    if (amount <= 0) {
      return res.status(400).json({ error: "Expense amount must be greater than zero." });
    }

    expense.type = type || expense.type;
    expense.amount = amount;

    await expense.save();

    return res.status(200).json(expense);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * @desc Delete an expense by ID
 * @route DELETE /api/expenses/:id
 */
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findOne({ where: { id, userId: req.user.id } });

    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    await expense.destroy();
    return res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
