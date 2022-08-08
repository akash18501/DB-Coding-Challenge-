import React from "react";
import { Box, Button, ListItemIcon, MenuItem, Typography } from "@mui/material";
import ResponsiveAppBar from "./ResponsiveAppBar";

const MyBook = () => {
    return (
        <>
            <ResponsiveAppBar />
            <Typography variant="h3" component="h2" m={3}>
                My Book
            </Typography>
        </>
    );
};

export default MyBook;
