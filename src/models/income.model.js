module.exports = (sequelize, DataTypes) => {
    const Income = sequelize.define("Income", {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true, // Each user can have only one income record
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0, // Default income is set to 0
        validate: {
          min: 0, // Prevent negative values
        },
      },
    });
  
    return Income;
  };
  