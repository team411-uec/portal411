import { GridCellParams, useGridApiContext } from "@mui/x-data-grid";
import { SyntheticEvent, useCallback, useLayoutEffect, useRef } from "react";
import { DataGridFreeAutocomplete } from "./data-grid-free-autocomplete";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DepartmentEditCell(params: GridCellParams<any, string>) {
  const { id, field, value, hasFocus } = params;
  const apiRef = useGridApiContext();
  const ref = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (hasFocus) {
      ref.current?.focus();
    }
  }, [hasFocus]);

  const updateMember = useCallback(
    (institution: string) => {
      apiRef.current.setEditCellValue({
        id,
        field,
        value: institution,
      });
    },
    [apiRef, field, id],
  );

  const handleChange = useCallback(
    (event: SyntheticEvent, newValue: string | null) => {
      updateMember(newValue || "");
    },
    [updateMember],
  );

  return (
    <DataGridFreeAutocomplete
      options={["I類", "II類", "III類"]}
      value={value}
      onChange={handleChange}
      id="department-autocomplete"
      freeSolo
      fullWidth
      disableClearable
      inputref={ref}
    />
  );
}
