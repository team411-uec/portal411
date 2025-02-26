import { GridCellParams, useGridApiContext } from "@mui/x-data-grid";
import { SyntheticEvent, useCallback, useLayoutEffect, useRef } from "react";
import { DataGridFreeAutocomplete } from "./data-grid-free-autocomplete";

const majors: Record<string, string[]> = {
  I類: [
    "メディア情報学プログラム",
    "経営・社会情報学プログラム",
    "情報数理工学プログラム",
    "コンピュータサイエンスプログラム",
    "デザイン思考・データサイエンスプログラム",
  ],
  II類: [
    "セキュリティ情報学プログラム",
    "情報通信工学プログラム",
    "電子情報学プログラム",
    "計測・制御システムプログラム",
    "先端ロボティクスプログラム",
  ],
  III類: [
    "機械システムプログラム",
    "電子工学プログラム",
    "光工学プログラム",
    "物理工学プログラム",
    "化学生命工学プログラム",
  ],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function MajorEditCell(params: GridCellParams<any, string>) {
  const { id, field, value, hasFocus, row } = params;
  const apiRef = useGridApiContext();
  const ref = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (hasFocus) {
      ref.current?.focus();
    }
  }, [hasFocus]);

  const updateMember = useCallback(
    (major: string) => {
      apiRef.current.setEditCellValue({
        id,
        field,
        value: major,
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

  const options = majors[row.department] || [];

  return (
    <DataGridFreeAutocomplete
      options={options}
      value={value}
      onChange={handleChange}
      id="major-autocomplete"
      freeSolo
      fullWidth
      disableClearable
      inputref={ref}
    />
  );
}
