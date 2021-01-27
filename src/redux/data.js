const categories = [{ id: "_1", name: "Fruit" }]

const items = [{ id: "_1", name: "avocado", category: { ...categories[0] }, note: "", image: "https://solidstarts.com/wp-content/uploads/introducing-avocado-to-babies.jpg" }]

const lists = [{ id: "_1", name: "Sample list", state: "completing", date: new Date("2021-01-10"), items: [{ ...items[0], quantity: 2 }] }]
// stateList: completing, editing, cancelled

export { categories, items, lists }
