'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cliente.hasMany(models.Registro, {
        as: 'registrosArray', // Como quiero que se llame la colección 
        foreignKey: 'cliente_id'
      })
    }
  }
  Cliente.init({
    nombre: DataTypes.STRING,
    fechaDeNacimiento: DataTypes.DATEONLY,
    /*edad: {
      type: new DataTypes.VIRTUAL(DataTypes.INTEGER, [fechaDeNacimiento]),
      get function () {
        return Math.floor(
          (new Date() = new Date(this.get('fechaDeNacimiento'))) /
          (1000 * 60 * 60 * 24 * 365.25)
        );
      }
    }*/
  }, {
    sequelize,
    modelName: 'Cliente',
    tableName: 'Cliente'
  });
  return Cliente;
};