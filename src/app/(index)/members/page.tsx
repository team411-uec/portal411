import { Box, Typography } from "@mui/material";
import { MembersTable } from "./_components/members-table";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function MembersPage() {
  const members = await prisma.member.findMany({ orderBy: { id: "asc" } });

  return (
    <Box
      sx={[
        {
          "&>*:not(:first-child)": {
            mt: 2,
          },
        },
      ]}
    >
      <Typography variant="h6">部員名簿</Typography>
      <MembersTable members={members} />
    </Box>
  );
}
