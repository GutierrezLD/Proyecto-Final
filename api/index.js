// ░░█▀░░░░░░░░░░░▀▀███████░░░░
// ░░█▌░░░░░░░░░░░░░░░▀██████░░░
// ░█▌░░░░░░░░░░░░░░░░███████▌░░
// ░█░░░░░░░░░░░░░░░░░████████░░
// ▐▌░░░░░░░░░░░░░░░░░▀██████▌░░
// ░▌▄███▌░░░░▀████▄░░░░▀████▌░░
// ▐▀▀▄█▄░▌░░░▄██▄▄▄▀░░░░████▄▄░
// ▐░▀░░═▐░░░░░░══░░▀░░░░▐▀░▄▀▌▌
// ▐░░░░░▌░░░░░░░░░░░░░░░▀░▀░░▌▌
// ▐░░░▄▀░░░▀░▌░░░░░░░░░░░░▌█░▌▌
// ░▌░░▀▀▄▄▀▀▄▌▌░░░░░░░░░░▐░▀▐▐░
// ░▌░░▌░▄▄▄▄░░░▌░░░░░░░░▐░░▀▐░░
// ░█░▐▄██████▄░▐░░░░░░░░█▀▄▄▀░░
// ░▐░▌▌░░░░░░▀▀▄▐░░░░░░█▌░░░░░░
// ░░█░░▄▀▀▀▀▄░▄═╝▄░░░▄▀░▌░░░░░░
// ░░░▌▐░░░░░░▌░▀▀░░▄▀░░▐░░░░░░░
// ░░░▀▄░░░░░░░░░▄▀▀░░░░█░░░░░░░
// ░░░▄█▄▄▄▄▄▄▄▀▀░░░░░░░▌▌░░░░░░
// ░░▄▀▌▀▌░░░░░░░░░░░░░▄▀▀▄░░░░░
// ▄▀░░▌░▀▄░░░░░░░░░░▄▀░░▌░▀▄░░░
// ░░░░▌█▄▄▀▄░░░░░░▄▀░░░░▌░░░▌▄▄
// ░░░▄▐██████▄▄░▄▀░░▄▄▄▄▌░░░░▄░
// ░░▄▌████████▄▄▄███████▌░░░░░▄
// ░▄▀░██████████████████▌▀▄░░░░
// ▀░░░█████▀▀░░░▀███████░░░▀▄░░
// ░░░░▐█▀░░░▐░░░░░▀████▌░░░░▀▄░
// ░░░░░░▌░░░▐░░░░▐░░▀▀█░░░░░░░▀
// ░░░░░░▐░░░░▌░░░▐░░░░░▌░░░░░░░

const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { Product, Category } = require("./src/db");
const { getProducts } = require("./src/middlewares/middlewares")

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, async () => {

    await getProducts();
    /*
        const cat = await Category.create({name:"Testing"})
        const test1 = await Product.create({
            name: "Test1",
            price: 100,
            description: "Test Product",
            rating: 5,
            image: null,
            stock: 1,
        })

        const test2 = await Product.create({
            name: "Test2",
            price: 10,
            description: "Test Product 2",
            rating: 1,
            image: null,
            stock: 1,
        })

        const test3 = await Product.create({
            name: "Test3",
            price: 10,
            description: "Test Product 3",
            rating: 5,
            image: null,
            stock: 1,
        })
*/
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
