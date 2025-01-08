import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { PropsWithChildren } from "react";

import theme from "@/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "./globals.css";

// const noto_sans_jp = Noto_Sans_JP({
//   weight: ["300", "400", "500", "700"],
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-noto-sans-jp",
// });

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ja">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
