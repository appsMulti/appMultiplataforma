const { DataTypes } = require('sequelize');
const { sequelize } = require('./connection');

//Modelo de alumno
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
  },
  id_entidad:{
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'alumnos',
  timestamps: false
});

//Modelo de entidad federativa
const Entidad = sequelize.define('EntidadFederativa', {
  id_entidad: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_entidad: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  abreviatura: {
    type: DataTypes.STRING(5),
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'entidad_federativa',
  timestamps: false
});


//Relaciones entre las entidades
Entidad.hasMany(Alumno, { foreignKey: 'id_entidad' });
Alumno.belongsTo(Entidad, { foreignKey: 'id_entidad' });

module.exports = {
  Alumno,
  Entidad 
};
