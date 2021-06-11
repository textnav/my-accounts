import {
  DataGrid,
  GridColDef,
  GridSortDirection,
  GridSortItem,
  GridSortModel,
  GridToolbar,
  GridValueFormatterParams
} from "@material-ui/data-grid";
import { RouteComponentProps } from "@reach/router";
import { Transaction } from "../../redux/account/account.reducer";


const columns: GridColDef[] = [
  {
    field: "timestamp",
    headerName: "Time",
    width: 200,
    type: "dateTime",
    valueFormatter: (params: GridValueFormatterParams) => {
      const value = params.getValue(params.id, "timestamp");
      return value ? new Date(Number(value)).toLocaleString() : "";
    },
  },
  { field: "description", headerName: "Description", width: 200, flex: 1 },
  { field: "action", headerName: "Action", width: 150 },
  {
    field: "amount",
    headerName: "Amount",
    width: 150,
    align: "right",
    headerAlign: "right",
    type: "number",
    valueFormatter: (params: GridValueFormatterParams) => {
      const amount = params.getValue(params.id, "amount");
      const currency = params.row.currency;
      return `${currency ?? ''}${(amount ?? '').toLocaleString()}`;
    },
  },
];

const timeStampSort: GridSortItem = {
  field: "timestamp",
  sort: "desc" as GridSortDirection,
};

const sortModel: GridSortModel = [timeStampSort];

interface TransactionProps extends RouteComponentProps {
  transactions: Transaction[];
}

export default function Transactions(props: TransactionProps) {
  const transactions = props.transactions;
  const dataGridComponents = {
    Toolbar: GridToolbar,
  };
  const gridContainerStyle = {
    height: "30rem",
    width: "100%",
  };

  return (
    <div style={gridContainerStyle}>
      <DataGrid
        rows={transactions}
        columns={columns}
        pagination
        autoPageSize
        sortModel={sortModel}
        components={dataGridComponents}
      />
    </div>
  );
}
