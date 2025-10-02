interface ColumnType {
  field: string;
  header: string;
}

function getColumns() {
  const columns: ColumnType[] = [
    { field: 'id', header: 'Code' },
    { field: 'title', header: 'Title' },
    { field: 'place_of_origin', header: 'Origin' },
    { field: 'artist_display', header: 'Artist' },
    { field: 'inscriptions', header: 'Inscriptions' },
    { field: 'date_start', header: 'Start Date' },
    { field: 'date_end', header: 'End Date' },
  ];

  return columns;
}

export default getColumns;
