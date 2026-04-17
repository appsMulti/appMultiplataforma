const { DataTypes } = require('sequelize');
const { sequelize } = require('./connection');

const Alumno = sequelize.define('Alumno', {
  numero_cuenta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido_paterno: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido_materno: {
    type: DataTypes.STRING,
    allowNull: false
  },
  curp: {
    type: DataTypes.CHAR(18),
    allowNull: false,
    unique: true
  },
  telefono: {
    type: DataTypes.CHAR(10),
    allowNull: false
  },
  sexo: {
    type: DataTypes.CHAR(1),
    allowNull: false
  },
  correo_electronico: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  fechaNacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
    foto_perfil: {
    type: DataTypes.BLOB('long'),
    allowNull: true
  }
}, {
  tableName: 'alumnos',
  timestamps: false
});

module.exports = Alumno;