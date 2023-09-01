import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { useMemo, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { themeSettings } from "./theme";
import GraphsDashboard from "@/views/graphs-dashboard";
import TablesDashboard from "@/views/tables-dasboard";
import { Filter } from "./components/modal/filter"; // Import your components
import html2canvas from "html2canvas";

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);

  const captureScreenshot = () => {
    // Capture the entire page
    html2canvas(document.body).then((canvas) => {
      // Convert canvas to data URL
      const dataUrl = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.href = dataUrl;

      downloadLink.download = "screenshot.png";

      downloadLink.click();
    });
  };

  return (
    <>
      <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
              {/* <button onClick={captureScreenshot}>Capture Screenshot</button> */}
              <Routes>
                {/* Graph view */}
                <Route
                  path="/"
                  element={
                    <GraphsDashboard captureScreenshot={captureScreenshot} />
                  }
                />
                {/* Table view */}
                <Route
                  path="/table-view"
                  element={
                    <TablesDashboard captureScreenshot={captureScreenshot} />
                  }
                />
                {/* Filter view */}
                <Route path="/filter" element={<Filter />} />
              </Routes>
            </Box>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
