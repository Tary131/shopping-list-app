import { useState, Suspense } from "react";
import Header from "./components/Header/Header.jsx";
import ShoppingList from "./components/ShoppingList/ShoppingList.jsx";
import AllLists from "./components/AllLists/AllLists.jsx";
import {Registration} from "./components/Registration/Registration.jsx";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme, darkTheme } from "./theme.js";
import i18n from "i18next";
import Login from "./components/Login/Login.jsx"
import styles from "./App.module.css";


const App = () => {
	const [darkMode, setDarkMode] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [showRegistration, setShowRegistration] = useState(false);
	const toggleDarkMode = () => {
		setDarkMode((prevMode) => !prevMode);
	};
	const handleCreateAccountClick = () => {
		setShowRegistration(true);
	};
	return (
		<div  className={`${styles.app} ${darkMode ? styles.darkMode : ""}`}>

			<Suspense fallback="loading...">
				<ThemeProvider theme={darkMode ? darkTheme : theme}>
					<Header
						toggleDarkMode={toggleDarkMode}
						darkMode={darkMode}
						i18n={i18n}
						availableLanguages={["en", "ru"]}
						isAuthenticated={isAuthenticated}
						setIsAuth={setIsAuthenticated}
						onCreateAccountClick={handleCreateAccountClick}
					/>
					{isAuthenticated ? (
					<Routes>
						<Route
							path="/shopping-list/:id"
							element={<ShoppingList darkMode={darkMode} />}
						/>
						<Route
							path="/all-lists"
							element={<AllLists darkMode={darkMode} />}
						/>
						<Route
							path="/shopping-list"
							element={<ShoppingList darkMode={darkMode} />}
						/>

					</Routes>) : (
<>
						<Login setIsAuth={setIsAuthenticated} />
	{showRegistration && <Registration  />}
</>)}
				</ThemeProvider>
			</Suspense>
		</div>
	);
};

export default App;
