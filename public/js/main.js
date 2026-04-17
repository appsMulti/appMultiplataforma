let table;

$(document).ready(function () {
  loadAlumnos();

  $('#btnAlumnos').click(loadAlumnos);
  $('#btnProfesores').click(loadProfesores);
});

function resetTable(headers) {
  if (table) {
    table.destroy();
  }

  // 🔥 limpia completamente la tabla
  $('#mainTable').empty();

  // 🔥 reconstruye el thead
  $('#mainTable').append(`
    <thead>
      <tr>${headers}</tr>
    </thead>
  `);
}

function loadAlumnos(){
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
    <th>Foto de perfil</th>
    <th>ID de entidad federativa</th>
  `);

  table = $('#mainTable').DataTable({
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
        data: 'foto_perfil',
      },
      { data: 'id_entidad' }
    ]
  });
}

function loadProfesores(){
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
    <th>data</th>
  `);

  table = $('#mainTable').DataTable({
    ajax: '/profesores',
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
      { data: 'all_data_professor'}
    ]
  });
}