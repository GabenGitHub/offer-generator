import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';

interface ITable {
  data: any[];
  columns: GridColDef[];
  handleRowClick: any;
}

export default function EnhancedTable(props: ITable) {
  const { data, columns, handleRowClick } = props;

  return (
    <div style={{
      width: '100%',
      maxWidth: '1400px',
      margin: '2rem auto',
    }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={10}
        autoHeight={true}
        rowsPerPageOptions={[10, 25, 50]}
        checkboxSelection
        disableSelectionOnClick
        loading={data.length === 0}

        onRowClick={(params: GridRowParams) => handleRowClick(params.id)}
      />
    </div>
  );
}
