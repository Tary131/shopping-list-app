import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronRight,
	faChevronLeft,
	faCircle,
	faCheckCircle,
	faPlus,
	faTrash,
	faUser,
	faUserMinus,
} from "@fortawesome/free-solid-svg-icons";
import {
	Button,
	Input,
	TextField,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	Grid,
} from "@mui/material";
import styles from "./ShoppingList.module.css";
import { useTranslation } from "react-i18next";
import {useParams} from "react-router-dom";

const ShoppingList = ({ darkMode }) => {
	const [listName, setListName] = useState("");
	const [items, setItems] = useState([]);
	const {id} = useParams()
	const [inputValue, setInputValue] = useState("");
	const [totalItemCount, setTotalItemCount] = useState(0);
	const [completedItemCount, setCompletedItemCount] = useState(0);
	const [newMemberName, setNewMemberName] = useState("");
	const [newMemberEmail, setNewMemberEmail] = useState("");
	const [members, setMembers] = useState([]);
	const [authorName, setAuthorName] = useState("");
	const { t } = useTranslation();
	const [data, setData] = useState({
		listName: undefined,
		items: undefined,
		members: undefined,
		authorName: undefined,
		totalItemCount: undefined,
		completedItemCount: undefined,
		uncompletedItemCount: undefined,
	});

	useEffect(() => {
		fetchData();
	}, [id]);
	const fetchData = async () => {
		try {
			if (!id) return;
			const response = await fetch("http://localhost:3001/shoppingLists");

			if (!response.ok) {
				throw new Error("Failed to fetch shopping list");
			}

			const fetchedData = await response.json();

			const fetchedItem = fetchedData.filter((item)=> item.id === id )[0]


			if (!fetchedItem) {
				throw new Error("Not found");
			}

			setData(fetchedItem);

		} catch (error) {
			console.error("Error fetching shopping list:", error.message);

		}
	};

	useEffect(() => {
		const newCompletedItemCount = items.filter(
			(item) => item.isSelected
		).length;
		setCompletedItemCount(newCompletedItemCount);
	}, [items]);
	const handleAddButtonClick = () => {
		const newItem = {
			itemName: inputValue,
			quantity: 1,
			isSelected: false,
		};

		const newItems = [...items, newItem];

		setItems(newItems);
		setInputValue("");
		calculateTotal();
	};
	useEffect(() => {
		setAuthorName("john");
	}, []);

	useEffect(()=>{
		if (data)
		{
			if (data.listName)
				setListName(data.listName)
			if (data.authorName)
				setAuthorName(data.authorName)
			if (data.items)
				setItems(data.items)
			if (data.inputValue)
				setInputValue(data.inputValue)
			if (data.totalItemCount)
				setTotalItemCount(data.totalItemCount)
			if (data.completedItemCount)
				setCompletedItemCount(data.completedItemCount)
			if (data.members)
				setMembers(data.members)

		}

	},[data])
	const handleQuantityIncrease = (index) => {
		const newItems = [...items];

		newItems[index].quantity++;

		setItems(newItems);
		calculateTotal();
	};
	const saveToServer = async (shoppingListData) => {
		try {
			const listId = uuidv4();

			const dataWithId = { id: listId, ...shoppingListData };

			const response = await fetch("http://localhost:3001/shoppingLists", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(dataWithId),
			});

			if (!response.ok) {
				throw new Error("Failed to create shopping list");
			}

			const createdShoppingList = await response.json();
			console.log("Created shopping list:", createdShoppingList);
		} catch (error) {
			console.error("Error creating shopping list:", error.message);
		}
	};

	const handleSaveList = () => {
		const totalItemCount = items.reduce(
			(total, item) => total + item.quantity,
			0
		);
		const completedItemCount = items.filter((item) => item.isSelected).length;
		const uncompletedItemCount = totalItemCount - completedItemCount;

		const dataToSave = {
			listName,
			items,
			members,
			authorName,
			totalItemCount,
			completedItemCount,
			uncompletedItemCount,
		};

		saveToServer(dataToSave);

		alert("Shopping list saved!");
	};

	const handleQuantityDecrease = (index) => {
		const newItems = [...items];

		if (newItems[index].quantity > 0) {
			newItems[index].quantity--;
		}

		setItems(newItems);
		calculateTotal();
	};
	const handleDeleteItem = (index) => {
		const newItems = [...items];
		newItems.splice(index, 1);

		setItems(newItems);
		calculateTotal();
	};
	const handleDeleteAllItems = () => {
		setItems([]);
		setTotalItemCount(0);
		setCompletedItemCount(0);
	};
	const toggleComplete = (index) => {
		const newItems = [...items];

		newItems[index].isSelected = !newItems[index].isSelected;

		setItems(newItems);
	};

	const calculateTotal = () => {
		const newTotalItemCount = items.reduce(
			(total, item) => total + item.quantity,
			0
		);
		const newCompletedItemCount = items.filter(
			(item) => item.isSelected
		).length;

		setTotalItemCount(newTotalItemCount);
		setCompletedItemCount(newCompletedItemCount);
	};
	const handleAddMember = () => {
		if (newMemberName && newMemberEmail) {
			const newMember = {
				name: newMemberName,
				email: newMemberEmail,
			};

			setMembers((prevMembers) => [...prevMembers, newMember]);
			setNewMemberName("");
			setNewMemberEmail("");
		} else {
			alert("Please enter both name and email for the new member.");
		}
	};
	const handleDeleteMember = (index) => {
		const updatedMembers = [...members];
		updatedMembers.splice(index, 1);
		setMembers(updatedMembers);
	};

	return (
		<div
			className={`${styles.appBackground} ${darkMode ? styles.darkMode : ""}`}
		>
			<div
				className={`${styles.mainContainer} ${darkMode ? styles.darkMode : ""}`}
			>
				<TextField
					value={listName}
					onChange={(event) => setListName(event.target.value)}
					variant="standard"
					color="primary"
					placeholder={t("List name...")}
				/>
				<div
					className={`${styles.addItemBox} ${darkMode ? styles.darkMode : ""}`}
				>
					<Input
						value={inputValue}
						onChange={(event) => setInputValue(event.target.value)}
						className={styles.addItemInput}
						placeholder={t("Add item...")}
					/>
					<FontAwesomeIcon
						icon={faPlus}
						onClick={() => handleAddButtonClick()}
					/>
				</div>
				<div className={styles.itemList}>
					{items.map((item, index) => (
						<div className={styles.itemContainer} key={index}>
							<div
								className={styles.itemName}
								onClick={() => toggleComplete(index)}
							>
								{item.isSelected ? (
									<>
										<FontAwesomeIcon icon={faCheckCircle} />
										<span className={styles.completed}>{item.itemName}</span>
									</>
								) : (
									<>
										<FontAwesomeIcon icon={faCircle} />
										<span>{item.itemName}</span>
									</>
								)}
							</div>
							<div
								className={`${styles.quantity} ${
									darkMode ? styles.darkMode : ""
								}`}
							>
								<Button>
									<FontAwesomeIcon
										icon={faChevronLeft}
										onClick={() => handleQuantityDecrease(index)}
									/>
								</Button>
								<span> {item.quantity} </span>
								<Button>
									<FontAwesomeIcon
										icon={faChevronRight}
										onClick={() => handleQuantityIncrease(index)}
									/>
								</Button>
								<div className={styles.removeButton}>
									<Button onClick={() => handleDeleteItem(index)}>
										<FontAwesomeIcon
											icon={faTrash}
											style={{ color: "black" }}
										/>
									</Button>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className={styles.itemList}>
					<Button
						className={styles.removeButton}
						onClick={() => handleDeleteAllItems()}
						style={{ color: "#0b35f2" }}
					>
						{t("Delete All")}
					</Button>
					<Button variant="contained" color="primary" onClick={handleSaveList}>
						{t("Save List")}
					</Button>
				</div>
				<div className={styles.total}>
					{t("Total")}: {totalItemCount}
				</div>
				<div className={styles.total}>
					{t("Completed")}: {completedItemCount}
				</div>
				<div className={styles.total}>
					{t("Uncompleted")}: {totalItemCount - completedItemCount}
				</div>
				<Grid container spacing={2} alignItems="center">
					<Grid item xs={4}>
						<TextField
							variant="standard"
							color="primary"
							label={t("New Member Name")}
							value={newMemberName}
							onChange={(event) => setNewMemberName(event.target.value)}
							fullWidth
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							variant="standard"
							color="primary"
							label={t("New Member Email")}
							value={newMemberEmail}
							onChange={(event) => setNewMemberEmail(event.target.value)}
							fullWidth
						/>
					</Grid>
					<Grid item xs={4}>
						<Button
							variant="contained"
							color="primary"
							onClick={handleAddMember}
						>
							{t("Add Member")}
						</Button>
					</Grid>
				</Grid>
				<List>
					{members.map((member, index) => (
						<ListItem key={index}>
							<ListItemIcon>
								<FontAwesomeIcon icon={faUser} style={{ color: "black" }} />
							</ListItemIcon>
							<ListItemText primary={member.name} secondary={member.email} />
							<Button
								variant="contained"
								color="error"
								onClick={() => handleDeleteMember(index)}
							>
								<FontAwesomeIcon
									icon={faUserMinus}
									style={{ color: "black" }}
								/>
							</Button>
						</ListItem>
					))}
				</List>

				<p>
					{t("Author")}: {authorName}
				</p>
			</div>
		</div>
	);
};

export default ShoppingList;
