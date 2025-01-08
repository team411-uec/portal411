import { DataGridInput } from "@/components/data-grid-input";
import { Autocomplete, createFilterOptions } from "@mui/material";
import { GridCellParams, useGridApiContext } from "@mui/x-data-grid";
import {
  SyntheticEvent,
  useCallback,
  useLayoutEffect,
  useRef
} from "react";

const filter = createFilterOptions<string>();

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
    <Autocomplete
      options={["I類", "II類", "III類"]}
      value={value}
      onChange={handleChange}
      id="department-autocomplete"
      renderInput={(params) => (
        <DataGridInput
          inputProps={params.inputProps}
          id={params.id}
          size={params.size}
          fullWidth={params.fullWidth}
          {...params.InputProps}
        />
      )}
      freeSolo
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const isExisting = options.indexOf(params.inputValue) !== -1;
        if (params.inputValue !== "" && !isExisting) {
          filtered.push(params.inputValue);
        }
        return filtered;
      }}
      ref={ref}
    />
  );
}
