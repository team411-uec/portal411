import { Box, Typography } from "@mui/material";
import { MembersTable } from "./_components/members-table";
import { prisma } from "@/lib/prisma";

export default async function MembersPage() {
  const members = await prisma.member.findMany({ orderBy: { id: "asc" } });

  return (
    <>
      <Typography variant="h6">部員名簿</Typography>
      <Box sx={{ mt: 2 }}>
        <MembersTable members={members} />
      </Box>
    </>
  );
}
