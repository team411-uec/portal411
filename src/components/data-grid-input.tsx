import { ComponentProps } from "react";
import { DataGridInputBase } from "./data-grid-input-base";

export function DataGridInput(props: ComponentProps<typeof DataGridInputBase>) {
  return <DataGridInputBase {...props} />;
}
