import { resetTable, setTable } from './tableUtils.js';

export const labelsAsignatura = {
  clave_asignatura: 'Clave de asignatura',
  nombre: 'Nombre'
};

export const newAsignatura = {
  clave_asignatura: 'Clave de asignatura',
  nombre: 'Nombre'
};

export function loadAsignaturas(){
  resetTable(`
    <th>ID de Asignatura</th>
    <th>Nombre</th>
    <th>Acciones</th>

  `);

  setTable($('#mainTable').DataTable({
    ajax: '/asignatura',
    dataSrc: '',
    columns: [
      { data: 'clave_asignatura' },
      { data: 'nombre' },
      {
        data: null,
        render: function (data) {
          return `
            <button class="btn btn-info btn-view">Ver información</button>
            <button class="btn btn-danger btn-delete" data-clave_asignatura="${data.clave_asignatura}">Eliminar</button>
          `
        }
      }
    ]
  }));
}

export function deleteAsignatura(clave_asignatura) {
  $.ajax({
    url: `/asignatura/${clave_asignatura}`,
    type: 'DELETE',
    success: function () {
      $('#mainTable').DataTable().ajax.reload();
    },
    error: function (xhr, status, error) {
      alert('Error al eliminar la asignatura: ' + xhr.responseText);
    }
  });
}

export function createAsignatura(asignaturaData) {
  $.ajax({
    url: '/asignatura',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(asignaturaData),
    success: function () {
      $('#mainTable').DataTable().ajax.reload();
    },
    error: function (xhr, status, error) {
      alert('Error al crear la asignatura: ' + xhr.responseText);
    }
  });
}