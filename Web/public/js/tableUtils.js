export let table = null;

export function resetTable(headers) {
  if (table) {
    table.destroy();
  }
  $('#mainTable').empty();
  $('#mainTable').append(`
    <thead><tr>${headers}</tr></thead>
  `);
}

export function getTable() {
  return table;
}

export function setTable(newTable) {
  table = newTable;
}