import SvgIcon from "@mui/material/SvgIcon";

const iconStyle = {
  fontSize: 32,
};

export const SendIcon = () => {
  return (
    <SvgIcon sx={iconStyle}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32" 
        fill="none"
      >
        <path
          d="M29.3332 2.66675L14.6665 17.3334" 
          stroke="#000A10"
          strokeWidth="2"         
          strokeLinecap="round"
          strokeLinejoin="round"               
        />
        <path
          d="M29.3332 2.66675L19.9998 29.3334L14.6665 17.3334L2.6665 12.0001L29.3332 2.66675Z"
          stroke="#000A10"        
          strokeWidth="2"        
          strokeLinecap="round"
          strokeLinejoin="round"        
        />        
      </svg>
    </SvgIcon>
  );
};