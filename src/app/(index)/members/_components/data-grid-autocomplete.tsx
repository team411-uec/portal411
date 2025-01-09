import { DataGridInput } from "@/components/data-grid-input";
import { Autocomplete } from "@mui/material";
import { ComponentPropsWithRef, ElementType, Ref } from "react";

type Props<
  Value,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
  ChipComponent extends ElementType = "div",
> = Omit<
  ComponentPropsWithRef<
    typeof Autocomplete<
      Value,
      Multiple,
      DisableClearable,
      FreeSolo,
      ChipComponent
    >
  >,
  "renderInput"
> & {
  inputref?: Ref<HTMLInputElement>;
};

export function DataGridAutocomplete<
  Value,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
  ChipComponent extends ElementType = "div",
>(props: Props<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>) {
  return (
    <Autocomplete
      {...props}
      renderInput={(params) => (
        <DataGridInput
          inputProps={params.inputProps}
          id={params.id}
          size={params.size}
          fullWidth={params.fullWidth}
          {...params.InputProps}
          inputRef={props.inputref}
        />
      )}
    />
  );
}
