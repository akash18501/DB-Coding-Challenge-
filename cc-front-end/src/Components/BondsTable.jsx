import React, { useMemo, useState, useEffect } from "react";
import MaterialReactTable from "material-react-table";
import {
  Box,
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
  Alert,
  LinearProgress,
} from "@mui/material";
import { AccountCircle, Send } from "@mui/icons-material";
// import { makeData } from "./makeData";
import ResponsiveAppBar from "./ResponsiveAppBar";
import TradeTable from "./TradeTable";
import { getAllSecurities, addToWatchList } from "../api/api";
import { CircularProgress } from "@mui/material";

const BondsTable = () => {
  const [securities, setSecurities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addedToWatchList, setAddedToWatchList] = useState(false);

  useEffect(() => {
    console.log("call to api");

    getAllSecurities().then((data) => {
      setSecurities(data);
    });
  }, []);

  useEffect(() => {
    console.log("securities in table", securities);
  }, [securities]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "isin", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
        header: "ISIN",
        size: 100,
      },
      {
        accessorKey: "cusip", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
        header: "CUSIP",
        size: 100,
      },
      {
        accessorKey: "issuer", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
        header: "Issuer",
        size: 100,
      },
      {
        accessorKey: "maturityDate", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
        header: "Maturity Date",
        size: 100,
      },
      {
        accessorKey: "coupon", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
        header: "Coupon",
        size: 100,
      },
      {
        accessorKey: "type", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
        header: "Type",
        size: 100,
      },
      {
        accessorKey: "faceValue", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
        header: "Face Value",
        size: 100,
      },
    ],
    []
  );

  return (
    <>
      <ResponsiveAppBar />
      {addedToWatchList === true ? (
        <Alert severity="success">
          This is a success alert — check it out!
        </Alert>
      ) : (
        <span></span>
      )}
      <Typography variant="h3" component="h2" m={3}>
        Bonds Experiment
      </Typography>
      {securities.length > 0 ? (
        <MaterialReactTable
          columns={columns}
          data={securities}
          enableClickToCopy
          enableColumnFilterChangeMode
          enableColumnOrdering
          enableColumnResizing
          // enableEditing
          enableGrouping
          enablePinning
          // enableRowActions
          // enableRowNumbers
          enableRowSelection
          muiSelectCheckboxProps={({ row }) => ({
            disabled: row.original.user != null,
          })}
          // onEditRowSubmit={handleSaveRow}
          positionToolbarAlertBanner="bottom"
          renderDetailPanel={({ row }) => {
            return <TradeTable tradeData={row.original.trades} />;
          }}
          renderTopToolbarCustomActions={({ table }) => {
            const handleAddToTheBook = () => {
              const selectedRows = table.getSelectedRowModel().flatRows;
              const securities_ids = selectedRows.map((e, i) => {
                return e.original.id;
              });
              console.log("selected rows", securities_ids);
              addToWatchList(securities_ids, 2)
                .then((res) => {
                  setAddedToWatchList(true);
                  setTimeout(() => {
                    setAddedToWatchList(false);
                  }, 2000);
                })
                .catch((error) => {});
            };

            return (
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <Button
                  color="info"
                  disabled={table.getSelectedRowModel().flatRows.length === 0}
                  onClick={handleAddToTheBook}
                  variant="contained"
                >
                  Add to the Watchlist
                </Button>
              </div>
            );
          }}
        />
      ) : (
        <LinearProgress color="primary" />
      )}
    </>
  );
};

export default BondsTable;
