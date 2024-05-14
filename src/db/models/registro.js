'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Registro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Registro.belongsTo(models.Alquilable, {
        as: 'alquilable',
        foreignKey: 'rentable_id',
      });
      Registro.belongsTo(models.Cliente, {
        as: 'cliente',
        foreignKey: 'cliente_id',
      })
    }
  }
  Registro.init({
    fecha: DataTypes.DATEONLY,
    abono: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Registro',
    tableName: 'Registro'
  });
  return Registro;
};