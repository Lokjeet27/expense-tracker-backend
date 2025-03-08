const express = require("express");
const { Income } = require("../models");
const { authenticate } = require("../middleware/auth.middleware");

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
router.post("/", authenticate, async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user.id;

    if (amount < 0) {
      return res.status(400).json({ error: "Income cannot be negative" });
    }

    const existingIncome = await Income.findOne({ where: { userId } });

    if (existingIncome) {
      return res.status(400).json({ error: "Income already exists. Use PUT to update." });
    }

    const income = await Income.create({ userId, amount: amount || 0 });

    return res.status(201).json(income);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

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
router.put("/", authenticate, async (req, res) => {
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
});

module.exports = router;
