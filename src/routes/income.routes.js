const express = require("express");
const { authenticate } = require("../middleware/auth.middleware");
const { addIncome, updateIncome, getIncome } = require("../controllers/income.controller");

const router = express.Router();

/**
 * @swagger
 * /api/income:
 *   post:
 *     summary: Set initial income for a user (Default 0, cannot be negative)
 *     tags: [Income]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 5000
 *     responses:
 *       201:
 *         description: Income set successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", authenticate, addIncome);

/**
 * @swagger
 * /api/income:
 *   put:
 *     summary: Update income (cannot be negative)
 *     tags: [Income]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 7000
 *     responses:
 *       200:
 *         description: Income updated successfully
 *       400:
 *         description: Invalid input
 */
router.put("/", authenticate, updateIncome);

/**
 * @swagger
 * /api/income:
 *   get:
 *     summary: Get income of the logged-in user
 *     tags: [Income]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns the user's income
 *       404:
 *         description: Income not found
 */
router.get("/", authenticate, getIncome);

module.exports = router;
