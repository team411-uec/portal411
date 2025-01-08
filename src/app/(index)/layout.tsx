import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Box component="main">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="h1">
            Portal411
          </Typography>
        </Toolbar>
      </AppBar>
      <Container
        sx={{
          marginTop: 2,
        }}
        maxWidth={false}
      >
        {children}
      </Container>
    </Box>
  );
}
