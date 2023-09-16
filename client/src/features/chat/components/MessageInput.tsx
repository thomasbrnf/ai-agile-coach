import { TextField, IconButton, Box } from "@mui/material";
import { SendIcon } from "./SendIcon";
import { useState } from "react";

const PLACEHOLDER_TEXT = "Ask me anything that I can help you or your team.. ";

const boxStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 2,
};

const textFieldStyle = {
  bgcolor: "#FAFDFE",
  borderRadius: "20px",
  outline: "none",
  "& fieldset": {
    border: "1px solid #ACADAD",
    borderRadius: "20px",
  },
};

const buttonStyle = {
  ":disabled": {
    opacity: "0.5",
  },
};

export default function MessageInput({
  send,
}: {
  send: (val: string) => void;
}) {
  const [value, setValue] = useState("");

  return (
    <Box sx={boxStyle}>
      <TextField
        sx={textFieldStyle}
        fullWidth
        variant="outlined"
        onChange={(e) => setValue(e.target.value)}
        placeholder={PLACEHOLDER_TEXT}
        value={value}
        multiline
        maxRows={5}
      />
      <IconButton
        aria-label="send"
        disabled={value === ""}
        onClick={() => {
          send(value);
          setValue("");
        }}
        sx={buttonStyle}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
}
