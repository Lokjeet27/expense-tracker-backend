const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user.model")(sequelize, DataTypes);
db.Income = require("./income.model")(sequelize, DataTypes);
db.Expense = require("./expense.model")(sequelize, DataTypes);

db.Income.belongsTo(db.User, { foreignKey: "userId" });
db.Expense.belongsTo(db.User, { foreignKey: "userId" });

module.exports = db;
