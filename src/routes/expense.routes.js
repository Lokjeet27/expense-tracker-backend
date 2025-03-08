const express = require("express");
const { Expense } = require("../models");
const { authenticate } = require("../middleware/auth.middleware");
const {
  addExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense
} = require("../controllers/expense.controller");

const router = express.Router();

/**
 * @swagger
 * /api/expenses:
 *   post:
 *     summary: Add an expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: ["Food", "Rent", "Transport", "Entertainment", "Others"]
 *               amount:
 *                 type: number
 *                 example: 100
 *     responses:
 *       201:
 *         description: Expense added successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", authenticate, addExpense);

/**
 * @swagger
 * /api/expenses:
 *   get:
 *     summary: Get all expenses for a user
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of expenses
 */
router.get("/", authenticate, getExpenses);

/**
 * @swagger
 * /api/expenses/{id}:
 *   get:
 *     summary: Get a specific expense by ID
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Expense ID
 *     responses:
 *       200:
 *         description: Expense details
 *       404:
 *         description: Expense not found
 */
router.get("/:id", authenticate, getExpenseById);

/**
 * @swagger
 * /api/expenses/{id}:
 *   put:
 *     summary: Update an existing expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Expense ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: ["Food", "Rent", "Transport", "Entertainment", "Others"]
 *               amount:
 *                 type: number
 *                 example: 150
 *     responses:
 *       200:
 *         description: Expense updated successfully
 *       404:
 *         description: Expense not found
 */
router.put("/:id", authenticate, updateExpense);

/**
 * @swagger
 * /api/expenses/{id}:
 *   delete:
 *     summary: Delete an expense by ID
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Expense ID
 *     responses:
 *       200:
 *         description: Expense deleted successfully
 *       404:
 *         description: Expense not found
 */
router.delete("/:id", authenticate, deleteExpense);

module.exports = router;
