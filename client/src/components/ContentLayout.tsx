import { Box } from "@mui/material";

const boxStyle = {
    py: { md: 5 },
    paddingLeft: { xs: 0, md: 30 },
}

export function ContentLayout({children}: {children: any}) {
    return (
        <Box sx={boxStyle}>
            {children}
        </Box>
    )
}