const express = require('express');
const app = express();
const port = 3000;
const { sequelize } = require('./src/connection');
const { Alumno, Entidad, Profesor, Asignatura, Plantel } = require('./src/models'); 

app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));

// Home ahora renderiza la tabla
app.get('/', (req, res) => {
  res.render('index');
});

/*
  * Funciones para alumno
 */
//obtener todos los alumnos
app.get('/alumnos', async (req, res) => {
  try {
    const alumnos = await Alumno.findAll();
    return res.json({ data: alumnos }); 
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

//Post para alumno
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

//Eliminar alumno
app.delete('/alumnos/:numero_cuenta', async (req, res) => {
  try {
    const { numero_cuenta } = req.params;
    
    const deleted = await Alumno.destroy({ where: { numero_cuenta } });
    
    if (deleted) {
      return res.status(204).send();
    } else {
      return res.status(404).json({ message: 'Alumno not found' });
    }
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });  
  }
});


/*
  * Funciones para entidad
 */
//obtener todas las entidades
app.get('/entidad', async (req, res) => {
  try {
    const entidades = await Entidad.findAll({
      include: [
        {
          model: Alumno,
          attributes: ['numero_cuenta', 'nombre', 'apellido_paterno'],
        },
      ],
    })
    return res.json({ data: entidades });
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

//post para entidad
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

//Eliminar entidad
app.delete('/entidad/:id_entidad', async (req, res) => {
  try {
    const { id_entidad } = req.params;
    
    const deleted = await Entidad.destroy({ where: { id_entidad } });
    
    if (deleted) {
      return res.status(204).send();
    }
    else {
      return res.status(404).json({ message: 'Entidad not found' });
    }
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });  
  }
});


/*
  * Funciones para entidad
 */
//obtener todos los profesores
app.get('/profesor', async (req, res) => {
  try {
    const profesores = await Profesor.findAll();
    return res.json({ data: profesores });
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

//post para profesor
app.post('/profesor', async (req, res) => {
  try {
    const { nombre, apellido_paterno, apellido_materno, curp, rfc, telefono, sexo, correo_electronico, fecha_nacimiento, sueldo } = req.body;

    if ( !nombre || !apellido_paterno || !apellido_materno || !curp || !rfc || !telefono || !sexo || !correo_electronico || !fecha_nacimiento || !sueldo ) {
      return res.status(400).json({ message: 'Bad request' });
    }

    const save = await Profesor.create({ nombre, apellido_paterno, apellido_materno, curp, rfc, telefono, sexo, correo_electronico, fecha_nacimiento, sueldo });
    return res.status(201).json(save);
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

//Eliminar profesor
app.delete('/profesor/:id_profesor', async (req, res) => {
  try {
    const { id_profesor } = req.params;
    
    const deleted = await Profesor.destroy({ where: { id_profesor } });
    
    if (deleted) {
      return res.status(204).send();
    }
    else {
      return res.status(404).json({ message: 'Profesor not found' });
    }
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });  
  }
});

/*
  * Funciones para asignatura
 */
//obtener todas las asignaturas
app.get('/asignatura', async (req, res) => {
  try {
    const asignaturas = await Asignatura.findAll();
    return res.json({ data: asignaturas });
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

//post para asignatura
app.post('/asignatura', async (req, res) => {
  try {
    const {clave_asignatura, nombre} = req.body;

    if (!clave_asignatura || !nombre) {
      return res.status(400).json({ message: 'Bad request, clave or nombre not found' });
    }
    const save = await Asignatura.create({
      clave_asignatura,
      nombre
    });
    
    return res.status(201).json({ asignatura: save });
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

//Eliminar asignatura
app.delete('/asignatura/:clave_asignatura', async (req, res) => {
  try {
    const { clave_asignatura } = req.params;
    
    const deleted = await Asignatura.destroy({ where: { clave_asignatura } });
    
    if (deleted) {
      return res.status(204).send();
    }
    else {
      return res.status(404).json({ message: 'Asignatura not found' });
    }
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });  
  }
});

/*
  * Funciones para entidad
 */
//obtener todos los planteles
app.get('/plantel', async (req, res) => {
  try {
    const planteles = await Plantel.findAll();
    return res.json({ data: planteles });
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

//post para plantel
app.post('/plantel', async (req, res) => {
  try {
    const nombre_plantel = req.body?.nombre_plantel;
    const createdAt = req.body?.createdAt;
    const updatedAt = req.body?.updatedAt;

    if (!nombre_plantel) {
      return res.status(400).json({ message: 'Bad request, nombre or abreviatura not found' });
    }
    const save = await Plantel.create({
      nombre_plantel,
      createdAt,
      updatedAt
    });
    
    return res.status(201).json({ plantel: save });
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

//Eliminar plantel
app.delete('/plantel/:clave_plantel', async (req, res) => {
  try {
    const { clave_plantel } = req.params;
    
    const deleted = await Plantel.destroy({ where: { clave_plantel } });
    
    if (deleted) {
      return res.status(204).send();
    }
    else {
      return res.status(404).json({ message: 'Plantel not found' });
    }
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