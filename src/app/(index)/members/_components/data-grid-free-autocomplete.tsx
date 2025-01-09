import { createFilterOptions } from "@mui/material";
import { ComponentPropsWithRef, ElementType } from "react";
import { DataGridAutocomplete } from "./data-grid-autocomplete";

type Props<
  Value,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
  ChipComponent extends ElementType = "div",
> = Omit<
  ComponentPropsWithRef<
    typeof DataGridAutocomplete<
      Value,
      Multiple,
      DisableClearable,
      FreeSolo,
      ChipComponent
    >
  >,
  "filterOptions"
> &
  (Value extends string
    ? {
        createValue?: (value: string) => Value;
      }
    : {
        createValue: (value: string) => Value;
      });

export function DataGridFreeAutocomplete<
  Value,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
  ChipComponent extends ElementType = "div",
>({
  createValue = (value) => value as Value,
  ...props
}: Props<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>) {
  const filter = createFilterOptions<Value>();

  return (
    <DataGridAutocomplete
      {...props}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const isExisting =
          options.indexOf(createValue(params.inputValue)) !== -1;
        if (params.inputValue !== "" && !isExisting) {
          filtered.push(createValue(params.inputValue));
        }
        return filtered;
      }}
    />
  );
}
