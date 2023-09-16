import { Typography } from "@mui/material";

const LOGO_TEXT = "Agile";

const logoStyles = {
  display: { xs: "none", md: "block" },
  paddingBottom: 7,
};

export function Logo() {
  return (
    <Typography variant="h5" sx={logoStyles}>
      {LOGO_TEXT}
    </Typography>
  );
}
