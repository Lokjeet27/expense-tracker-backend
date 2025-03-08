// const express = require("express");
// const { addExpense } = require("../controllers/expense.controller");
// const authMiddleware = require("../middleware/auth.middleware");

// const router = express.Router();

// /**
//  * @swagger
//  * /api/expenses:
//  *   post:
//  *     summary: Add an expense
//  *     tags: [Expenses]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               type:
//  *                 type: string
//  *                 enum: ["Food", "Rent", "Transport", "Entertainment", "Others"]
//  *               amount:
//  *                 type: number
//  *     responses:
//  *       201:
//  *         description: Expense added
//  *       400:
//  *         description: Expense exceeds income
//  */

// router.post("/", authMiddleware, addExpense);

// module.exports = router;


const express = require("express");
const { authenticate } = require("../middleware/auth.middleware");
const expenseController = require("../controllers/expense.controller"); // ✅ Import correctly

const router = express.Router();

// ✅ Add an expense
router.post("/", authenticate, expenseController.addExpense);

// ✅ Get all expenses
router.get("/", authenticate, expenseController.getExpenses);

// ✅ Update an expense
router.put("/:id", authenticate, expenseController.updateExpense);

// ✅ Delete an expense
router.delete("/:id", authenticate, expenseController.deleteExpense);

module.exports = router; // ✅ Ensure router is exported correctly

