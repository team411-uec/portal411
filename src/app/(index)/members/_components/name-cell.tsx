import { GridRenderCellParams } from "@mui/x-data-grid";

export function NameCell(
  params: GridRenderCellParams<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    {
      firstName: string;
      lastName: string;
    }
  >,
) {
  const { value } = params;
  return `${value?.lastName} ${value?.firstName}`;
}
