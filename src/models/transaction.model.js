module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define("Transaction", {
    type: { type: DataTypes.ENUM("income", "expense"), allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    description: DataTypes.STRING,
  });
  return Transaction;
};
