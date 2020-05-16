// Creating our Activity model
module.exports = function(sequelize, DataTypes) {
  const Activity = sequelize.define('Activity', {
    // The email cannot be null, and must be a proper email before creation
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // The password cannot be null
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    lon: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    // checkOutTime: {
    //   type: DataTypes.TIME,
    //   allowNull: false,
    // },
    // placeName: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    // placeId: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
  });

  return Activity;
};
