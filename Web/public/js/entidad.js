import { resetTable, setTable } from './tableUtils.js';

export const labelsEntidad = {
  id_entidad: 'ID de entidad',
  nombre_entidad: 'Nombre',
  abreviatura: 'Abreviatura'
};

export const newEntidad = {
  nombre_entidad: 'Nombre',
  abreviatura: 'Abreviatura'
};

export function loadEntidades(){
  resetTable(`
    <th>ID de entidad</th>
    <th>Nombre</th>
    <th>Abreviatura</th>
    <th>Acciones</th>
  `);

  setTable($('#mainTable').DataTable({
    ajax: '/entidad',
    dataSrc: '',
    columns: [
      { data: 'id_entidad' },
      { data: 'nombre_entidad' },
      { data: 'abreviatura' },
      {
        data: null,
        render: function (data) {
          
          return `
            <button class="btn btn-info btn-view">Ver información</button>
            <button class="btn btn-danger btn-delete" data-id_entidad="${data.id_entidad}">Eliminar</button>

          `
        }
      }
    ]
  }));
}

//funcion para eliminar una entidad, solamente sirve si la entidad no tiene ningún alumno asociado a ella
export function deleteEntidad(id_entidad) {
  $.ajax({
    url: `/entidad/${id_entidad}`,
    type: 'DELETE',
    success: function () {
      $('#mainTable').DataTable().ajax.reload();
    },
    error: function (xhr, status, error) {
      alert('Error al eliminar la entidad: ' + xhr.responseText);
    }
  });
}

//funcion para crear una nueva entidad
export function createEntidad(entidadData) {
  $.ajax({
    url: '/entidad',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(entidadData),
    success: function () {
      $('#mainTable').DataTable().ajax.reload();
    },
    error: function (xhr, status, error) {
      alert('Error al crear la entidad: ' + xhr.responseText);
    }
  });
}

//funcion para actualizar una entidad existente
export function updateEntidad(id_entidad, entidadData) {
  $.ajax({
    url: `/entidad/${id_entidad}`,
    type: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify(entidadData),
    success: function () {
      $('#mainTable').DataTable().ajax.reload();
    },
    error: function (xhr, status, error) {
      alert('Error al actualizar la entidad: ' + xhr.responseText);
    }
  });
}

