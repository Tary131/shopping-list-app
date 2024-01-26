
export const mockShoppingLists = [
    {
        id: 1,
        listName: "List Name....",
        items: [
            { itemName: "item 1", quantity: 2, isSelected: false },
            { itemName: "item 2", quantity: 3, isSelected: true },
            { itemName: "item 3", quantity: 2, isSelected: false },
            { itemName: "banan", quantity: 1, isSelected: false },

        ],
        members: [
            { name: "fghn", email: "bv nbm" },

        ],
        authorName: "john",
        totalItemCount: 8,
        completedItemCount: 1,
        uncompletedItemCount: 7,
        isArchived: true,
    },
    {
        id: 2,
        listName: "Family Trip Essentials",
        items: [
            { itemName: "Travel snacks", quantity: 5, isSelected: true },
            { itemName: "Sunscreen", quantity: 2, isSelected: false },
            { itemName: "Travel guidebook", quantity: 1, isSelected: false },

        ],
        members: [
            { name: "Alice", email: "alice@example.com" },
            { name: "Bob", email: "bob@example.com" },

        ],
        authorName: "Jane",
        totalItemCount: 8,
        completedItemCount: 1,
        uncompletedItemCount: 7,
        isArchived: false,
    },
    {
        id: 3,
        listName: "DIY Home Projects",
        items: [
            { itemName: "Paint cans", quantity: 4, isSelected: false },
            { itemName: "Brushes", quantity: 3, isSelected: true },
            { itemName: "Wood planks", quantity: 10, isSelected: false },
            // Add more items as needed
        ],
        members: [
            { name: "David", email: "david@example.com" },
            { name: "Eva", email: "eva@example.com" },
            // Add more members as needed
        ],
        authorName: "Alice",
        totalItemCount: 17,
        completedItemCount: 3,
        uncompletedItemCount: 14,
        isArchived: false,
    },

];
export const getMockShoppingListById = (id) => {
    return mockShoppingLists.find((item) => item.id === id) || null;
};