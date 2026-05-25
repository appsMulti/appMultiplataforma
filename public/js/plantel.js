import { resetTable, setTable } from './tableUtils.js';

export const labelsPlantel = {
  clave_plantel: 'Clave del plantel',
  nombre_plantel: 'Nombre'
};

export const newPlantel = {
  clave_plantel: 'Clave del plantel',
  nombre_plantel: 'Nombre'
};

export function loadPlanteles(){
  resetTable(`
    <th>Clave del plantel</th>
    <th>Nombre</th>
    <th>Acciones</th>

  `);

  setTable($('#mainTable').DataTable({
    ajax: '/plantel',
    dataSrc: '',
    columns: [
      { data: 'clave_plantel' },
      { data: 'nombre_plantel' },
      {
        data: null,
        render: function (data) {
          
          return `
            <button class="btn btn-info btn-view">Ver información</button>
            <button class="btn btn-danger btn-delete" data-clave_plantel="${data.clave_plantel}">Eliminar</button>
          `
        }
      }
    ]
  }));
}

export function deletePlantel(clave_plantel) {
  $.ajax({
    url: `/plantel/${clave_plantel}`,
    type: 'DELETE',
    success: function () {
      $('#mainTable').DataTable().ajax.reload();
    },
    error: function (xhr, status, error) {
      alert('Error al eliminar el plantel: ' + xhr.responseText);
    }
  });
}

export function createPlantel(plantelData) {
  $.ajax({
    url: '/plantel',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(plantelData),
    success: function () {
      $('#mainTable').DataTable().ajax.reload();
    },
    error: function (xhr, status, error) {
      alert('Error al crear el plantel: ' + xhr.responseText);
    }
  });
}