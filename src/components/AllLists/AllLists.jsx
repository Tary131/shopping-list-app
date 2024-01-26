import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import styles from "./AllLists.module.css";
import { PieChart, Pie, Cell } from "recharts";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useTranslation } from "react-i18next";
import {mockShoppingLists} from "../../mockData.js";

const AllLists = ({ darkMode }) => {
	const [shoppingLists, setShoppingLists] = useState([]);
	const [tabValue, setTabValue] = useState(0);
	const { t } = useTranslation();

	useEffect(() => {
		fetchShoppingLists();
	}, [tabValue]);

	const fetchShoppingLists = async () => {
		try {
			const response = await fetch("http://localhost:3001/shoppingLists");

			if (!response.ok) {
				throw new Error("Failed to fetch shopping lists");
			}

			const fetchedShoppingLists = await response.json();
			setShoppingLists(fetchedShoppingLists);
		} catch (error) {
			console.error("Error fetching shopping lists:", error.message);
			setShoppingLists(mockShoppingLists);
		}
	};

	const handleDeleteList = async (id) => {
		try {
			const response = await fetch(
				`http://localhost:3001/shoppingLists/${id}`,
				{
					method: "DELETE",
				}
			);

			if (!response.ok) {
				throw new Error("Failed to delete shopping list");
			}

			const updatedLists = shoppingLists.filter((list) => list.id !== id);
			setShoppingLists(updatedLists);
		} catch (error) {
			console.error("Error deleting shopping list:", error.message);
		}
	};

	const handleIsArchived = async (id) => {
		try {
			const response = await fetch(
				`http://localhost:3001/shoppingLists/${id}`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						isArchived: true,
					}),
				}
			);

			if (!response.ok) {
				throw new Error(
					"Failed to mark shopping list as completed and archived"
				);
			}

			const updatedLists = shoppingLists.map((list) =>
				list.id === id
					? {
							...list,
							completedItemCount: list.totalItemCount,
							uncompletedItemCount: 0,
							isArchived: true,
					  }
					: list
			);
			setShoppingLists(updatedLists);
		} catch (error) {
			console.error(
				"Error marking shopping list as completed and archived:",
				error.message
			);
		}
	};

	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
	};
	const filteredLists =
		tabValue === 0
			? shoppingLists.filter((list) => !list.isArchived)
			: shoppingLists.filter((list) => list.isArchived);

	return (
		<div className={`${styles.container} ${darkMode ? styles.darkMode : ""}`}>
			<Tabs
				value={tabValue}
				onChange={handleTabChange}
				style={{ marginBottom: 15 }}
				aria-label="basic tabs example"
			>
				<Tab label={t("Actual")} />
				<Tab label={t("Archived")} />
			</Tabs>

			<h2
				className={`${styles.centeredText} ${darkMode ? styles.darkText : ""}`}
			>
				{t("All Shopping Lists")}
			</h2>
			<Box className={styles.cardContainer}>
				{filteredLists.map((list) => (
					<Box
						key={list.id}
						className={`${styles.card} ${darkMode ? styles.darkCard : ""}`}
					>
						<PieChart width={200} height={200}>
							<Pie
								data={[
									{ name: "Completed", value: list.completedItemCount },
									{ name: "Uncompleted", value: list.uncompletedItemCount },
								]}
								dataKey="value"
								nameKey="name"
								cx="50%"
								cy="50%"
								outerRadius={50}
								fill="#000000"
								label
							>
								{["#003295", "#da0303"].map((color, index) => (
									<Cell key={index} fill={color} />
								))}
							</Pie>
						</PieChart>
						<Typography variant="h5" component="div">
							{list.listName}
						</Typography>
						<Typography>
							{t("Total Items")}: {list.totalItemCount}
						</Typography>
						<Typography>
							{t("Completed Items")}: {list.completedItemCount}
						</Typography>
						<Typography>
							{t("Uncompleted Items")}: {list.uncompletedItemCount}
						</Typography>
						<Typography>
							{t("Author")}: {list.authorName}
						</Typography>
						<Button
							component={Link}
							to={`/shopping-list/${list.id}`}
							color="primary"
						>
							{t("View List")}
						</Button>
						<Button onClick={() => handleDeleteList(list.id)} color="error">
							{t("Delete List")}
						</Button>
						<Button
							onClick={() => handleIsArchived(list.id)}
							variant="contained"
							color="primary"
						>
							{t("Mark as Completed")}
						</Button>
					</Box>
				))}
			</Box>
		</div>
	);
};

export default AllLists;
