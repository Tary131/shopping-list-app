import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
	shadows: ["none"],
	palette: {
		primary: {
			main: "#4361ee",
		},
	},
	typography: {
		button: {
			textTransform: "none",
			fontWeight: 400,
		},
	},
});
export const lightTheme = createTheme({
	palette: {},
});

export const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});
