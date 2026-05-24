import { resetTable, setTable } from './tableUtils.js';

//constante para saber que información se va a mostrar en el modal
export const labelsAlumno = {
  numero_cuenta:    'Número de cuenta',
  nombre:           'Nombre',
  apellido_paterno: 'Apellido paterno',
  apellido_materno: 'Apellido materno',
  curp:             'CURP',
  telefono:         'Teléfono',
  sexo:             'Sexo',
  correo_electronico: 'Correo electrónico',
  fecha_nacimiento: 'Fecha de nacimiento',
  id_entidad:       'Entidad de origen'
};

export const newAlumno = {
  numero_cuenta:      'Número de cuenta',
  nombre:             'Nombre',
  apellido_paterno:   'Apellido paterno',
  apellido_materno:   'Apellido materno',
  curp:               'CURP',
  telefono:           'Teléfono',
  sexo:               'Sexo',
  correo_electronico: 'Correo electrónico',
  fecha_nacimiento:   'Fecha de nacimiento',
  foto_perfil:        'Foto de perfil',
  id_entidad:         'Entidad de origen'
};

//función para cargar la tabla de alumnos
export function loadAlumnos() {
  resetTable(`
    <th>Número de cuenta</th>
    <th>Nombre</th>
    <th>Apellido paterno</th>
    <th>Apellido materno</th>
    <th>CURP</th>
    <th>Teléfono</th>
    <th>Sexo</th>
    <th>Correo electrónico</th>
    <th>Fecha de nacimiento</th>
    <th>Acciones</th>
  `);

  setTable($('#mainTable').DataTable({
    ajax: '/alumnos',
    dataSrc: '',
    columns: [
      { data: 'numero_cuenta' },
      { data: 'nombre' },
      { data: 'apellido_paterno' },
      { data: 'apellido_materno' },
      { data: 'curp' },
      { data: 'telefono' },
      { data: 'sexo' },
      { data: 'correo_electronico' },
      { data: 'fecha_nacimiento' },
      {
        data: null,
        render: function (data) {
          return `
            <button class="btn btn-info btn-view">Ver información</button>
            <button class="btn btn-danger btn-delete" data-numero_cuenta="${data.numero_cuenta}">Eliminar</button>
          `
        }
      }
    ]
  }));
}

export function createAlumno(alumnoData) {
  $.ajax({
    url: '/alumnos',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(alumnoData),
    success: function () {
      $('#mainTable').DataTable().ajax.reload();
    },
    error: function (xhr, status, error) {
      alert('Error al crear el alumno: ' + xhr.responseText);
    }
  });
}

export function deleteAlumno(numero_cuenta) {
  $.ajax({
    url: `/alumnos/${numero_cuenta}`,
    type: 'DELETE',
    success: function () {
      $('#mainTable').DataTable().ajax.reload();
    },
    error: function () {
      alert('Error deleting alumno');
    }
  });
}
