import { useState, useEffect } from "react";
import { Typography } from "@mui/material";

const WRITING_CONTENT = "AgileGPT writing";

const dotArray = [".", "..", "..."];

const writingActionStyle = {
  fontSize: "18px",
  color: "#ACADAD",
  p: 0,
  paddingBottom: 2,
};

export function WritingStatus() {
  const [dotIndex, setDotIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotIndex((prev) => (prev + 1) % dotArray.length);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Typography sx={writingActionStyle}>
      {WRITING_CONTENT}
      {dotArray[dotIndex]}
    </Typography>
  );
}
