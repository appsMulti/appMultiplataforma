const express = require('express');
const app = express();
const port = 3000;
const { sequelize } = require('./src/connection');
const { Alumno, Entidad, Profesor } = require('./src/models'); 

app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));

// Home ahora renderiza la tabla
app.get('/', (req, res) => {
  res.render('index');
});


//  SOLO JSON para DataTables
app.get('/alumnos', async (req, res) => {
  try {
    const alumnos = await Alumno.findAll();
    return res.json({ data: alumnos }); 
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/alumnos', async (req, res) => {
  try {
    const { numero_cuenta, nombre, apellido_paterno, apellido_materno, curp, telefono, sexo, correo_electronico, fecha_nacimiento, foto_perfil, id_entidad } = req.body;

    if (!numero_cuenta || !nombre || !apellido_paterno || !apellido_materno || !curp || !telefono || !sexo || !correo_electronico || !fecha_nacimiento) {
      return res.status(400).json({ message: 'Bad request' });
    }

    const save = await Alumno.create({ numero_cuenta, nombre, apellido_paterno, apellido_materno, curp, telefono, sexo, correo_electronico, fecha_nacimiento, foto_perfil, id_entidad });
    return res.status(201).json(save);
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/entidad', async (req, res) => {
  try {
    const entidades = await Entidad.findAll({
      include: [
        {
          model: Entidad,
          as: 'entidades',
          attributes: ['id_entidad', 'nombre_entidad', 'abreviatura'],
        },
      ],
    })
    return res.json({ entidades });
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/entidad', async (req, res) => {
  try {
    const nombre_entidad = req.body?.nombre_entidad;
    const abreviatura = req.body?.abreviatura;
    const createdAt = req.body?.createdAt;
    const updatedAt = req.body?.updatedAt;

    if (!nombre_entidad || !abreviatura) {
      return res.status(400).json({ message: 'Bad request, nombre or abreviatura not found' });
    }
    const save = await Entidad.create({
      nombre_entidad,
      abreviatura,
      createdAt,
      updatedAt
    });
    
    return res.status(201).json({ entidad: save });
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});  


app.get('/profesor', async (req, res) => {
  try {
    const profesores = await Profesor.findAll();
    return res.json({ data: profesores });
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/profesor', async (req, res) => {
  try {
    const { numero_empleado, nombre, apellido_paterno, apellido_materno, curp, telefono, sexo, correo_electronico, fecha_nacimiento } = req.body;

    if (!numero_empleado || !nombre || !apellido_paterno || !apellido_materno || !curp || !telefono || !sexo || !correo_electronico || !fecha_nacimiento) {
      return res.status(400).json({ message: 'Bad request' });
    }

    const save = await Profesor.create({ numero_empleado, nombre, apellido_paterno, apellido_materno, curp, telefono, sexo, correo_electronico, fecha_nacimiento });
    return res.status(201).json(save);
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


sequelize.authenticate()
  .then(() => {
    console.log('Connection success');
    return sequelize.sync();
  }) 
  .then(() => {
    console.log('Sync models');
    app.listen(port, () => {
      console.log(`Server listen on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Connection fail', error);
  }); 