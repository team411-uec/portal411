import { prisma } from "@/lib/prisma";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export default async function PrefecturePage() {
  const prefectures = await prisma.prefecture.findMany();
  const columns: GridColDef<(typeof prefectures)[number]>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
  ];

  return (
    <Box>
      <DataGrid rows={prefectures} columns={columns} />
    </Box>
  );
}
