import { Typography, IconButton } from "@mui/material";

const nameStyle = {
  color: "#000A10",
  fontSize: "18px",
  display: { xs: "none", sm: "block" },
};

const buttonStyle = {
  gap: 1,
  py: 1,
  m: 0,
  ":hover": {
    borderRadius: "10px",
  },
  borderRadius: "10px",
};

export function NavigationButton({ name, icon, onClick }: { name: string; icon: any, onClick: () => void }) {
  return (
    <IconButton aria-label="navigate" sx={buttonStyle} onClick={onClick} >
      {icon}
      <Typography sx={nameStyle}>{name}</Typography>
    </IconButton>
  );
}
