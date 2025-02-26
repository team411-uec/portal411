"use client";

import {
  DataGrid,
  GridColDef,
  GridColumnVisibilityModel,
} from "@mui/x-data-grid";
import { TableToolbar } from "./table-toolbar";
import { useCallback, useState } from "react";
import { Member } from "@prisma/client";
import { updateMember } from "@/actions/update-member";
import { NameEditCell } from "./name-edit-cell";
import { DepartmentEditCell } from "./department-edit-cell";
import { MajorEditCell } from "./major-edit-cell";
import { useSingleClickEditing } from "@/hooks/use-single-click-editing";
import { Alert, Slide, Snackbar } from "@mui/material";

interface Props {
  members: Member[];
}

const renderNameEditCell: GridColDef["renderCell"] = (params) => {
  return <NameEditCell {...params} />;
};

const renderNameCell: GridColDef["renderCell"] = (params) => {
  const { value } = params;
  return `${value?.lastName} ${value?.firstName}`;
};

const renderDepartmentEditCell: GridColDef["renderCell"] = (params) => {
  return <DepartmentEditCell {...params} />;
};

const renderMajorEditCell: GridColDef["renderCell"] = (params) => {
  return <MajorEditCell {...params} />;
};

export function MembersTable({ members }: Props) {
  const rows = members.map(({ firstName, lastName, ...member }) => ({
    name: {
      firstName,
      lastName,
    },
    ...member,
  }));
  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      hideable: false,
    },
    {
      field: "name",
      headerName: "氏名",
      editable: true,
      renderEditCell: renderNameEditCell,
      // TODO: valueFormatに置き換え
      renderCell: renderNameCell,
      width: 150,
    },
    {
      field: "institution",
      headerName: "所属",
      editable: true,
    },
    {
      field: "faculty",
      headerName: "学部",
      editable: true,
    },
    {
      field: "department",
      headerName: "学科",
      editable: true,
      renderEditCell: renderDepartmentEditCell,
    },
    {
      field: "major",
      headerName: "専攻",
      editable: true,
      renderEditCell: renderMajorEditCell,
      width: 200,
    },
    {
      field: "studentId",
      headerName: "学籍番号",
      editable: true,
    },
    {
      field: "entrancedYear",
      headerName: "入学年",
      editable: true,
    },
    {
      field: "email",
      headerName: "メールアドレス",
      width: 200,
      editable: true,
    },
    {
      field: "birthday",
      headerName: "生年月日",
      editable: true,
      type: "date",
    },
    {
      field: "hasKey505",
      headerName: "505鍵",
      type: "boolean",
      editable: true,
    },
    {
      field: "hasKeyPictlab",
      headerName: "ピクトラボ鍵",
      type: "boolean",
      editable: true,
    },
    {
      field: "joinedAt",
      headerName: "入部日",
      editable: true,
      type: "date",
    },
    {
      field: "leftAt",
      headerName: "退部日",
      editable: true,
      type: "date",
    },
    {
      field: "comment",
      headerName: "備考",
      width: 300,
      editable: true,
    },
    {
      field: "createdAt",
      headerName: "作成日時",
    },
    {
      field: "updatedAt",
      headerName: "更新日時",
    },
  ];

  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>({
      id: true,
      name: true,
      institution: false,
      faculty: false,
      department: true,
      major: true,
      studentId: true,
      entrancedYear: true,
      email: true,
      birthday: false,
      hasKey505: false,
      hasKeyPictlab: false,
      joinedAt: false,
      leftAt: false,
      addressId: false,
      comment: true,
      createdAt: false,
      updatedAt: false,
    });

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleColumnVisibilityModelChange = useCallback(
    (model: GridColumnVisibilityModel) => {
      setColumnVisibilityModel(model);
    },
    [],
  );

  const processRowUpdate = useCallback(
    async (
      { name, ...newRow }: (typeof rows)[number],
      oldRow: (typeof rows)[number],
    ) => {
      const result = await updateMember(oldRow.id, { ...newRow, ...name });
      if (!result.isSuccessful) {
        throw new Error(result.message);
      }
      const { firstName, lastName, ...body } = result.body;
      return {
        name: {
          firstName: firstName,
          lastName: lastName,
        },
        ...body,
      };
    },
    [],
  );

  const handleProcessRowUpdateError = useCallback((error: unknown) => {
    setErrorMessage(error instanceof Error ? error.message : "Unknown Error");
    setIsError(true);
  }, []);

  const [cellModesModel, handleCellClick, handleCellModesModelChange] =
    useSingleClickEditing();

  return (
    <>
      <DataGrid
        density="compact"
        slots={{
          toolbar: TableToolbar,
        }}
        rows={rows}
        columns={columns}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={handleColumnVisibilityModelChange}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        cellModesModel={cellModesModel}
        onCellClick={handleCellClick}
        onCellModesModelChange={handleCellModesModelChange}
      />
      <Snackbar
        open={isError}
        TransitionComponent={Slide}
      >
        <Alert onClose={() => setIsError(false)} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
