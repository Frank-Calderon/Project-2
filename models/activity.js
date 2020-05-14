// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
// var bcrypt = require("bcryptjs");

// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var Activity = sequelize.define("Activity", {
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
    checkInTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    checkOutTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    placeName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    placeId: {
        type: DataTypes.STRING,
        allowNull: true,
      }
  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  // Activity.prototype.checkIn = function(checkInTime) {
  //   // return bcrypt.compareSync(password, this.password);
  // };

  // Activity.prototype.checkOut = function(checkOutTime){

  // }
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
//   User.addHook("beforeCreate", function(user) {
//     user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
//   });
  return Activity;
};