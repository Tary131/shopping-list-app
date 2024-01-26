// api.js
import { v4 as uuidv4 } from 'uuid';

export const fetchData = async (id, setData) => {
    try {
        if (!id) return;
        const response = await fetch(`http://localhost:3001/shoppingLists/${id}`);

        if (!response.ok) {
            throw new Error('Failed to fetch shopping list');
        }

        const fetchedData = await response.json();

        if (!fetchedData) {
            throw new Error('Not found');
        }

        setData(fetchedData);
    } catch (error) {
        console.error('Error fetching shopping list:', error.message);
    }
};

export const saveToServer = async (shoppingListData) => {
    try {
        const listId = uuidv4();

        const dataWithId = { id: listId, ...shoppingListData };

        const response = await fetch('http://localhost:3001/shoppingLists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataWithId),
        });

        if (!response.ok) {
            throw new Error('Failed to create shopping list');
        }

        const createdShoppingList = await response.json();
        console.log('Created shopping list:', createdShoppingList);
    } catch (error) {
        console.error('Error creating shopping list:', error.message);
    }
};
