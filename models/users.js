const { DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt')

module.exports = (sequelize) => {
  const User = sequelize.define('users', {
    id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
      },
      name: DataTypes.STRING,
      firstSurname: DataTypes.STRING,
      secondSurname: DataTypes.STRING,
      type: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
}, {
  hooks: {
    beforeCreate: (user) => {
      const salt = bcrypt.genSaltSync()
      user.password = bcrypt.hashSync(user.password, salt)
    }
  }
});

User.prototype.validPassword = function(password) { 
  return bcrypt.compareSync(password, this.password)
}

return User

}