import * as Alumnos from './alumno.js';
import * as Profesores from './profesor.js';
import * as Entidades from './entidad.js';
import * as Asignaturas from './asignatura.js';
import * as Planteles from './plantel.js';

import { getTable } from './tableUtils.js';

let currentType = '';

function mostrarTablas() {
  $('#vista-landing').hide();
  $('#vista-tablas').show();
  $('#navInicio').removeClass('active');
  $('#navTablas').addClass('active');
}

function mostrarLanding() {
  $('#vista-tablas').hide();
  $('#vista-landing').show();
  $('#navTablas').removeClass('active');
  $('#navInicio').addClass('active');
}

//Utilizado para saber el tipo de dato (currentType), y el boton
const btnLabels = {
  btnAlumnos:     'Alumnos',
  btnProfesores:  'Profesores',
  btnEntidades:   'Entidades',
  btnAsignaturas: 'Asignaturas',
  btnPlanteles:   'Planteles'
};

//Utilizado para mostrar la información
const labelsMap = {
  Alumnos:     Alumnos.labelsAlumno,
  Profesores:  Profesores.labelsProfesor,
  Entidades:   Entidades.labelsEntidad,
  Asignaturas: Asignaturas.labelsAsignatura,
  Planteles:   Planteles.labelsPlantel
};

//Utilizado para crear un nuevo registro
const newsMap = {
  Alumnos:     Alumnos.newAlumno,
  Profesores:  Profesores.newProfesor,
  Entidades:   Entidades.newEntidad,
  Asignaturas: Asignaturas.newAsignatura,
  Planteles:   Planteles.newPlantel
}

//funcion para cargar todas las entidades que tenemos para un dropwdwon
async function cargarDropdowns(labels) {
  const dropdowns = {};

  for (const key of Object.keys(labels)) {
    if (dropdownSources[key]) {
      const { url, valueKey, labelKey } = dropdownSources[key];
      const data = await $.get(url);
      dropdowns[key] = data.map(item => ({
        value: item[valueKey],
        label: item[labelKey]
      }));
    }
  }

  return dropdowns;
}

//helper para decidir si el campo que estamos mostrando es fecha, o genero
function inputPorCampo(key, value = '', entidades = [], readonly = '') {
  if (key === 'fecha_nacimiento') {
    return `<input type="date" class="form-control" data-key="${key}" value="${value}" ${readonly}>`;
  }
  if (key === 'sexo') {
    return `
      <select class="form-select" data-key="${key}">
        <option value="" ${value === '' ? 'selected' : ''}>-- Selecciona --</option>
        <option value="M" ${value === 'M' ? 'selected' : ''}>Masculino</option>
        <option value="F" ${value === 'F' ? 'selected' : ''}>Femenino</option>
      </select>`;
  }
  if (key === 'correo_electronico') {
    return `<input type="email" class="form-control" data-key="${key}" value="${value}" ${readonly}>`;
  }
  if (key === 'id_entidad') {
    const disabledAttr = readonly ? 'disabled' : '';
    const opts = entidades.map(e =>
      `<option value="${e.id_entidad}" ${value == e.id_entidad ? 'selected' : ''}>${e.nombre_entidad}</option>`
    ).join('');
    return `
      <select class="form-select" data-key="${key}" ${disabledAttr}>
        <option value="">-- Selecciona entidad --</option>
        ${opts}
      </select>`;
  }
  return `<input type="text" class="form-control" data-key="${key}" value="${value}" ${readonly}>`;
}

function activarBtn(id) {
  //recorre todos los botones y evalua cual debe ser activado
  //al final cambia el titulo de la tabla para que el usuario sepa cuál esta "activo"
  Object.keys(btnLabels).forEach(boton => {
    $('#' + boton).toggleClass('btn-primary',         boton === id)
              .toggleClass('btn-outline-primary',  boton !== id);
  });
  $('#tabla-titulo').text(btnLabels[id]);

  currentType = btnLabels[id];
}

$(document).ready(function () {
  //al cargar página, mostrar alumnos y activar boton
  Alumnos.loadAlumnos();
  activarBtn('btnAlumnos');

  $('#btnAlumnos').click(Alumnos.loadAlumnos);
  $('#btnProfesores').click(Profesores.loadProfesores);
  $('#btnEntidades').click(Entidades.loadEntidades);
  $('#btnAsignaturas').click(Asignaturas.loadAsignaturas);
  $('#btnPlanteles').click(Planteles.loadPlanteles);
  $('#navInicio').on('click', mostrarLanding);

  $('#btnVerTablas, #navTablas').on('click', mostrarTablas);
  
  // Estado visual de botones de tabla
  $('#btnAlumnos').on('click', function () { activarBtn('btnAlumnos'); });
  $('#btnProfesores').on('click', function () { activarBtn('btnProfesores'); });
  $('#btnEntidades').on('click', function () { activarBtn('btnEntidades'); });
  $('#btnAsignaturas').on('click', function () { activarBtn('btnAsignaturas'); });
  $('#btnPlanteles').on('click', function () { activarBtn('btnPlanteles'); });

});

//Botón de ver información sobre un registro
$('#mainTable').on('click', '.btn-view', async function () {
  const data = getTable().row($(this).parents('tr')).data();
  const labels = labelsMap[currentType] || {};

  let entidades = [];
  //console.log('Buscando entidades:')
  if (Object.keys(labels).includes('id_entidad')) {
    //console.log('cargando entidades');
    const response = await $.getJSON('/entidad');
    entidades = response.data;  
  }

  $('#modalBody').empty();
  $('#modalTitulo').text(currentType);

  Object.entries(labels).forEach(([key, label], index) => {
    const readonly = index === 0 ? 'readonly' : '';
    $('#modalBody').append(`
      <div class="mb-2">
        <label class="form-label fw-semibold">${label}</label>
        ${inputPorCampo(key, data[key] ?? '', entidades, readonly)}
      </div>
    `);
  });

  //al hacer clic obtiene los cambios guardados del modal y decide cual tipo de tabla usar
  $('#viewModal .modal-footer .btn-primary').off('click').on('click', async function () {
    const actualizarData = {};
    
    $('#modalBody input, #modalBody select').each(function () {
      const key = $(this).data('key');
      if (key) {
        actualizarData[key] = $(this).val();
      }
    });

    let url = '';
    switch (currentType) {
      case 'Alumnos':
        url = `/alumnos/${data.numero_cuenta}`;
        break;
      case 'Asignaturas':
        url = `/asignatura/${data.clave_asignatura}`;
        break;
      case 'Entidades':
        url = `/entidad/${data.id_entidad}`;
        break;
      case 'Planteles':
        url = `/plantel/${data.clave_plantel}`;
        break;
      case 'Profesores':
        url = `/profesor/${data.id_profesor}`;
        break;
      default:
        alert('Unknown type: ' + currentType);
        return;
    }

    try {
      const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(actualizarData)
      });

      if (res.ok) {
        const modalElement = document.getElementById('viewModal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        modalInstance.hide();
        getTable().ajax.reload();
      } else {
        const err = await res.json();
        alert('Error al actualizar: ' + err.message);
      }
    } catch (error) {
      console.error(error);
      alert('Error en la petición de actualización');
    }
  });

  new bootstrap.Modal(document.getElementById('viewModal')).show();
});

//boton para eliminar cualquier registro
$('#mainTable').on('click', '.btn-delete', function () {
  const data = getTable().row($(this).parents('tr')).data();
  console.log('Data to delete:', data);
  const info = Object.values(labelsMap[currentType] || {}).map(label => `${label}: ${data[label]}`).join('\n');
  
  //TO-DO: Cambiar el mensaje de confirmación, ahora solo muestra el json del objeto a eliminar
  if (!confirm('Está seguro que desea eliminar este registro?' + JSON.stringify(data) )) return;

  switch (currentType) {
    case 'Alumnos':
      Alumnos.deleteAlumno(data.numero_cuenta);
      break;

    case 'Asignaturas':
      Asignaturas.deleteAsignatura(data.clave_asignatura);
      break;

    case 'Entidades':
      Entidades.deleteEntidad(data.id_entidad);
      break;

    case 'Planteles':
      Planteles.deletePlantel(data.clave_plantel);
      break;

    case 'Profesores':
      Profesores.deleteProfesor(data.id_profesor);
      break;

    default:
      alert('Unknown type: ' + currentType);
  }
});

//Botón para agregar un nuevo registro
$(document).on('click', '#btnAgregarNuevo', async function () {
  const labels = newsMap[currentType] || {};

  let entidades = [];
  if (Object.keys(labels).includes('id_entidad')) {
    const response = await $.getJSON('/entidad');
    entidades = response.data;  
  }

  $('#modalBodyNuevo').empty();
  $('#modalTituloNuevo').text('Agregar ' + currentType);

  Object.entries(labels).forEach(([key, label]) => {
    $('#modalBodyNuevo').append(`
      <div class="mb-2">
        <label class="form-label fw-semibold">${label}</label>
        ${inputPorCampo(key, '', entidades)}
      </div>
    `);
  });

  const modal = new bootstrap.Modal(document.getElementById('nuevoModal'));

  $('#btnGuardarNuevo').off('click').on('click', function () {

    const nuevoData = {};

    $('#modalBodyNuevo input, #modalBodyNuevo select').each(function () {  // ← corregido
      nuevoData[$(this).data('key')] = $(this).val();
    });

    switch (currentType) {
      case 'Alumnos':     
        Alumnos.createAlumno(nuevoData);         
        break;

      case 'Asignaturas':
        Asignaturas.createAsignatura(nuevoData); 
        break;

      case 'Entidades':
        Entidades.createEntidad(nuevoData);
        break;

      case 'Planteles':
        Planteles.createPlantel(nuevoData);      
        break;

      case 'Profesores':  
        Profesores.createProfesor(nuevoData);
        break;

      default:
         alert('Unknown type: ' + currentType);
    }

    modal.hide();
  });

  modal.show();
});