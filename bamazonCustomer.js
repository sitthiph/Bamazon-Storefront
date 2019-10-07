const inquirer = require("inquirer");
//const connection = require("./app/config/connection.js");
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "11389",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    main();
});

/**
 *  TODO LIST:
 *  CRUD update in connection.js or here;
 *  then other .js
 */

// Main OOP style;
function main() {
    readAllProducts();
}

// Read
function readAllProducts() {
    connection.query("SELECT * FROM products;", function (res, err) {
        out = res;
        if (err) throw err;
        console.log(res);
        for (let i = 0; i < res.length; i++) {
            let item = res[i].RowDataPacket.product_name;
            let price = res[i].RowDataPacket.price;
            console.log(`ID: ${i} Item: ${item} Listing Price: ${price}`);
        }
    });
}

function updateAProduct(itemID, unit) {
    connection.query("UPDATE products SET ? WHERE ?", [{quantity: 100}, {flavor: "Rocky Road"}],
        (err) => {if (err) throw err;}
    );
}

function promptquestion(res) {
    inquirer.prompt([
        {
            type: "number",
            name: "id",
            message: "What is the ID of the product you would like to buy?"
        },
        {
            type: "number",
            name: "unit",
            message: "how many units of the product would you like to buy?",
        }
    ]).then(function(user) {
        if(user.id < 1 || user.id > res.length || user.unit < 1) {
            console.log("Invalid input");
            promptquestion()
        } else {
            if(user.unit > product.stockQuantity) {
                console.log("Insufficient Quantity!");
                promptquestion(res);
            } else {
                updateAProduct(user.id, user.unit)
                // TODO: show total cost of the purchase;
            }
        }
    });
}
// Start the program;