import React, { useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import { Box, Button, ListItemIcon, MenuItem, Typography } from "@mui/material";
import { AccountCircle, Send } from "@mui/icons-material";
import { makeData } from "./makeData";
import ResponsiveAppBar from "./ResponsiveAppBar";
import TradeTable from "./TradeTable";

const Table = () => {
    const columns = useMemo(
        () => [
            {
                accessorFn: (row) => `${row.firstName} ${row.lastName}`, //accessorFn used to join multiple data into a single cell
                id: "name", //id is still required when using accessorFn instead of accessorKey
                enableClickToCopy: false,
                header: "Name",
                Cell: ({ cell }) => (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                        }}
                    >
                        <img
                            alt="avatar"
                            height={30}
                            src={cell.row.original.avatar}
                            loading="lazy"
                            style={{ borderRadius: "50%" }}
                        />
                        <Typography>{cell.getValue()}</Typography>
                    </Box>
                ),
            },
            {
                accessorKey: "email", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
                header: "Email",
                size: 300,
            },
            {
                accessorKey: "salary",
                enableEditing: true,
                filterVariant: "range",
                header: "Salary",
                //custom conditional format and styling
                Cell: ({ cell }) => (
                    <Box
                        sx={(theme) => ({
                            backgroundColor:
                                cell.getValue() < 50_000
                                    ? theme.palette.error.dark
                                    : cell.getValue() >= 50_000 &&
                                      cell.getValue() < 75_000
                                    ? theme.palette.warning.dark
                                    : theme.palette.success.dark,
                            borderRadius: "0.25rem",
                            color: "#fff",
                            maxWidth: "9ch",
                            p: "0.25rem",
                        })}
                    >
                        {cell.getValue()?.toLocaleString?.("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                        })}
                    </Box>
                ),
                size: 60,
            },
            {
                accessorKey: "jobTitle", //hey a simple column for once
                header: "Job Title",
                size: 350,
            },
            {
                Cell: ({ cell }) => cell.getValue()?.toLocaleDateString?.(), //transform data to readable format for cell render
                Header: () => <em>Start Date</em>, //custom header markup
                accessorFn: (row) => new Date(row.startDate), //transform data before processing so sorting works
                accessorKey: "startDate",
                header: "Start Date",
                muiTableHeadCellFilterTextFieldProps: {
                    type: "date",
                },
                sortingFn: "datetime",
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
            <MaterialReactTable
                columns={columns}
                data={employeeData}
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
                    disabled: row.getValue("salary") < 60000,
                })}
                // onEditRowSubmit={handleSaveRow}
                positionToolbarAlertBanner="bottom"
                renderDetailPanel={({ row }) => {
                    return <TradeTable />;
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
                                disabled={
                                    table.getSelectedRowModel().flatRows
                                        .length === 0
                                }
                                onClick={handleAddToTheBook}
                                variant="contained"
                            >
                                Add to the book
                            </Button>
                        </div>
                    );
                }}
            />
        </>
    );
};

export default Table;
