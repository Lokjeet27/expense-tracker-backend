require("dotenv").config();
const express = require("express");
const cors = require('cors');
const db = require("./src/models");
const authRoutes = require("./src/routes/auth.routes");
const incomeRoutes = require("./src/routes/income.routes");
const expenseRoutes = require("./src/routes/expense.routes");

const swaggerDocs = require("./src/docs/swagger"); // Fix import

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/expenses", expenseRoutes);

swaggerDocs(app); // Correctly initialize Swagger

db.sequelize.sync().then(() => console.log("Database connected!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
