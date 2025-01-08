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

interface Props {
  members: Member[];
}

export function MembersTable({ members }: Props) {
  const rows = members.map(({ firstName, lastName, ...member }) => ({
    name: `${lastName} ${firstName}`,
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
      headerName: "名前",
      editable: true,
      
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
    },
    {
      field: "major",
      headerName: "専攻",
      editable: true,
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

  const handleColumnVisibilityModelChange = useCallback(
    (model: GridColumnVisibilityModel) => {
      setColumnVisibilityModel(model);
    },
    [],
  );

  const processRowUpdate = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async ({name, ...newRow}: (typeof rows)[number], oldRow: (typeof rows)[number]) => {
      const result = await updateMember(oldRow.id, newRow);
      return {
        name: `${result.lastName} ${result.firstName}`,
        ...result,
      };
    },
    [],
  );

  const handleProcessRowUpdateError = useCallback((error: unknown) => {
    console.error(error);
  }, []);

  return (
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
    />
  );
}
