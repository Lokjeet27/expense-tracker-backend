const db = require("../models");
const Transaction = db.Transaction;

/**
 * @desc Get all transactions
 * @route GET /api/transactions
 */
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({ where: { userId: req.user.id } });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Get transaction by ID
 * @route GET /api/transactions/:id
 */
exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (!transaction) return res.status(404).json({ error: "Transaction not found" });

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Update transaction
 * @route PUT /api/transactions/:id
 */
exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (!transaction) return res.status(404).json({ error: "Transaction not found" });

    await transaction.update(req.body);
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Delete transaction
 * @route DELETE /api/transactions/:id
 */
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (!transaction) return res.status(404).json({ error: "Transaction not found" });

    await transaction.destroy();
    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
