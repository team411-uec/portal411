"use client";

import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { GridToolbarContainer } from "@mui/x-data-grid";

export function TableToolbar() {
  return (
    <GridToolbarContainer>
      <Button variant="text" size="small" startIcon={<Add />}>
        追加
      </Button>
    </GridToolbarContainer>
  );
}
