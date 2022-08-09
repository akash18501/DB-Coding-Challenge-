import React, { useMemo, useState, useEffect } from "react";
import MaterialReactTable from "material-react-table";
import { Box, Button, ListItemIcon, MenuItem, Typography } from "@mui/material";
import { AccountCircle, Send } from "@mui/icons-material";
import { makeData } from "./makeData";
import ResponsiveAppBar from "./ResponsiveAppBar";
import TradeTable from "./TradeTable";
import { getAllSecurities } from "../api/api";

const Table = () => {
  const [securities, setSecurities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const [employeeData, setEmployeeData] = useState(() => makeData());

  return (
    <>
      <ResponsiveAppBar />
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
          // muiSelectCheckboxProps={({ row }) => ({
          //   disabled: row.getValue("salary") < 60000,
          // })}
          // onEditRowSubmit={handleSaveRow}
          positionToolbarAlertBanner="bottom"
          renderDetailPanel={({ row }) => {
            // console.log("row called ", row.original.trades);
            return <TradeTable tradeData={row.original.trades} />;
          }}
          renderTopToolbarCustomActions={({ table }) => {
            const handleAddToTheBook = () => {
              table.getSelectedRowModel().flatRows.map((row) => {
                alert("contact " + row.getValue("name"));
              });
            };

            return (
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <Button
                  color="info"
                  disabled={table.getSelectedRowModel().flatRows.length === 0}
                  onClick={handleAddToTheBook}
                  variant="contained"
                >
                  Add to the book
                </Button>
              </div>
            );
          }}
        />
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default Table;
