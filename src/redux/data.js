const categories = [{ id: "_1c", name: "Fruit" }, { id: "_2c", name: "Vegetable" }, { id: "_3c", name: "Dairy" }, { id: "_4c", name: "Meat and fish" }]

const items = [
    {
        id: "_1", name: "Avocado", category: { ...categories[0] }, note: `Copy
    Nutrient-dense foods are those that provide substantial amounts of vitamins, minerals and other nutrients with relatively few calories. One-third of a medium avocado (50 g) has 80 calories and contributes nearly 20 vitamins and minerals, making it a great nutrient-dense food choice.`, image: "https://solidstarts.com/wp-content/uploads/introducing-avocado-to-babies.jpg"
    },
    { id: "_2", name: "Cherry (100g)", category: { ...categories[0] }, note: "", image: "https://larecette.net/wp-content/uploads/2019/02/poires-1200x900.jpg" },
    { id: "_3", name: "Pear", category: { ...categories[0] }, note: "", image: "https://solidstarts.com/wp-content/uploads/introducing-avocado-to-babies.jpg" },
    { id: "_4", name: "Apple", category: { ...categories[0] }, note: "", image: "" },
    { id: "_5", name: "Fig", category: { ...categories[0] }, note: "", image: "https://www.lanutrition.fr/sites/default/files/styles/article_large/public/ressources/figues_3_6.jpg?itok=Xfn5A2Os" },
    { id: "_6", name: "Banana", category: { ...categories[0] }, note: "", image: "https://www.elle.be/fr/wp-content/uploads/2020/09/img-bienfaits-profiter-banane.jpg" },
    { id: "_7", name: "Cucumber", category: { ...categories[1] }, note: "", image: "https://photos.gammvert.fr/v5/products/full/46423-concombre-kalunga-f1-2.jpeg" },
    { id: "_8", name: "Bunch of carrots (5pcs)", category: { ...categories[1] }, note: "", image: "https://wordpress.potagercity.fr/wp-content/uploads/2019/03/produit-carotte.jpg" },
    { id: "_9", name: "Roquefort", category: { ...categories[2] }, note: "", image: "https://dam.savencia-fromagedairy.com/m/72f083ba0f5a5202/LA02_768x400-LA02_38_roquefort_V2_3.jpg" },
]

const lists = [{
    id: "_1l", name: "Sample list", state: "IN_PROGRESS", date: new Date("2021-01-10"),
    categories: [
        { id: "_1c", name: "Fruit", items: [{ ...items[0], check: false, quantity: 2 }, { ...items[1], check: false, quantity: 1 }, { ...items[2], check: false, quantity: 3 }, { ...items[4], check: false, quantity: 5 }] },
        { id: "_2c", name: "Vegetable", items: [{ ...items[6], check: false, quantity: 2 }] },
        { id: "_3c", name: "Dairy", items: [{ ...items[8], check: false, quantity: 1 }] },
    ]

},
]
// stateList: EDITING => IN_PROGRESS => COMPLETE / CANCELLED, IN_PROGRESS

export { categories, items, lists }
