import {
  AppBar,
  Box,
  Container,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Box component="main">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="h1">
            <Link
              href="/"
              color="inherit"
              underline="none"
              component={NextLink}
            >
              Portal411
            </Link>
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
