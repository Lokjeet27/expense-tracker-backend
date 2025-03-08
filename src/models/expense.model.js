module.exports = (sequelize, DataTypes) => {
    const Expense = sequelize.define("Expense", {
      type: {
        type: DataTypes.ENUM("Food", "Rent", "Transport", "Entertainment", "Others"),
        allowNull: false,
      },
      amount: { type: DataTypes.FLOAT, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false },
    });
  
    return Expense;
  };
  