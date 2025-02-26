import { DataGridInput } from "@/components/data-grid-input";
import { GridRenderEditCellParams, useGridApiContext } from "@mui/x-data-grid";
import {
  ChangeEvent,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

export function NameEditCell(
  params: GridRenderEditCellParams<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    {
      firstName: string;
      lastName: string;
    }
  >,
) {
  const { id, field, value, hasFocus } = params;
  const apiRef = useGridApiContext();
  const ref = useRef<HTMLInputElement>(null);
  const [firstName, setFirstName] = useState(value?.firstName);
  const [lastName, setLastName] = useState(value?.lastName);

  useLayoutEffect(() => {
    if (hasFocus) {
      ref.current?.focus();
    }
  }, [hasFocus]);

  const updateMember = useCallback(
    (firstName: string, lastName: string) => {
      apiRef.current.setEditCellValue({
        id,
        field,
        value: {
          firstName,
          lastName,
        },
      });
    },
    [apiRef, field, id],
  );

  const handleFirstNameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setFirstName(newValue);
      updateMember(newValue, lastName || "");
    },
    [lastName, updateMember],
  );

  const handleLastNameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setLastName(newValue);
      updateMember(firstName || "", newValue);
    },
    [firstName, updateMember],
  );

  return (
    <>
      <DataGridInput
        inputRef={ref}
        value={lastName}
        onChange={handleLastNameChange}
        placeholder="名字"
        sx={{
          "& input": {
            paddingRight: 0,
          },
        }}
      />
      <DataGridInput
        inputRef={ref}
        value={firstName}
        onChange={handleFirstNameChange}
        placeholder="名前"
        sx={{
          "& input": {
            paddingLeft: 0,
          },
        }}
      />
    </>
  );
}
