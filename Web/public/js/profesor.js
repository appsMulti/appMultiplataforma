import { resetTable, setTable } from './tableUtils.js';

export const labelsProfesor = {
  id_profesor:        'ID de profesor',
  nombre:             'Nombre',
  apellido_paterno:   'Apellido paterno',
  apellido_materno:   'Apellido materno',
  curp:               'CURP',
  rfc:                'RFC',
  telefono:           'Teléfono',
  sexo:               'Sexo',
  correo_electronico: 'Correo electrónico',
  fecha_nacimiento:   'Fecha de nacimiento',
  sueldo:             'Sueldo'
};

export const newProfesor = {
  nombre:             'Nombre',
  apellido_paterno:   'Apellido paterno',
  apellido_materno:   'Apellido materno',
  curp:               'CURP',
  rfc:                'RFC',
  telefono:           'Teléfono',
  sexo:               'Sexo',
  correo_electronico: 'Correo electrónico',
  fecha_nacimiento:   'Fecha de nacimiento',
  sueldo:             'Sueldo'
};

export function loadProfesores(){
  resetTable(`
    <th>ID de profesor</th>
    <th>Nombre</th>
    <th>Apellido paterno</th>
    <th>Apellido materno</th>
    <th>CURP</th>
    <th>RFC</th>
    <th>Teléfono</th>
    <th>Sexo</th>
    <th>Correo electrónico</th>
    <th>Fecha de nacimiento</th>
    <th>Sueldo</th>
    <th>Acciones</th>
  `);

  setTable($('#mainTable').DataTable({
    ajax: '/profesor',
    dataSrc: '',
    columns: [
      { data: 'id_profesor' },
      { data: 'nombre' },
      { data: 'apellido_paterno' },
      { data: 'apellido_materno' },
      { data: 'curp' },
      {data : 'rfc'},
      { data: 'telefono' },
      { data: 'sexo' },
      { data: 'correo_electronico' },
      { data: 'fecha_nacimiento' },
      { data: 'sueldo' },
      {
        data: null,
        render: function (data) {
          
          return `
            <button class="btn btn-info btn-view">Ver información</button>
            <button class="btn btn-danger btn-delete" data-id_profesor="${data.id_profesor}">Eliminar</button>
          `
        }
      }
    ]
  }));
}

export function deleteProfesor(id_profesor) {
  $.ajax({
    url: `/profesor/${id_profesor}`,
    type: 'DELETE',
    success: function () {
      $('#mainTable').DataTable().ajax.reload();
    },
    error: function (xhr, status, error) {
      alert('Error al eliminar el profesor: ' + xhr.responseText);
    }
  });
}

export function createProfesor(profesorData) {
  $.ajax({
    url: '/profesor',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(profesorData),
    success: function () {
      $('#mainTable').DataTable().ajax.reload();
    },
    error: function (xhr, status, error) {
      alert('Error al crear el profesor: ' + xhr.responseText);
    }
  });
}

