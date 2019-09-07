var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host:"localhost",
    port:"8889",
    user:"root",
    password:"root",
    database:"bamazon"
});


function allProducts() {
connection.connect(function(error){
    if(error)
    {
        console.log(error);
    }
    else
    {
        //console.log("You have successfully connected.");
        connection.query("SELECT * FROM products", function(error,res){
            if(error)
            {
                console.log(error);
            }
            else{
                //console.log(res);
                for(var i = 0; i < res.length; i++)
                {
                    console.log("Product ID: ",res[i].item_id);
                    console.log("Product name: ",res[i].product_name);
                    console.log("Price: ",res[i].price);
                    console.log("-----------------------");
                }
            }
        })
    }
})
}

allProducts();


function buyProduct() {
    inquirer.prompt([
        {
            type:"input",
            name: "id",
            message: "Enter the ID of the product you would like to order."
        },
        {
            type: "input",
            name: "quantity",
            message: "How many of this products you would like to order?"
        }
    ])
    .then(function(response){
        itemRequested = response.id;
        quantityRequested = parseInt(response.quantity)
        buyThisItem(itemRequested, quantityRequested)
    })

    function buyThisItem(itemRequested, quantityRequested) {
        connection.query("SELECT * FROM products where item_id=" + itemRequested,function(error, res){
            if(error)
            {
                console.log(error);
            }
            else
            {
                if(res.length == 0)
                    {
                        console.log("-----------------------");
                        console.log("We don't have any item under this ID...");
                        console.log("-----------------------");
                        buyProduct();
                    }
                for(var i = 0; i < res.length; i++)
                {
                    var numberOfItems = parseInt(res[i].stock_quantity);
                    console.log("-----------------------");
                    console.log("The item you picked: " + res[i].product_name);
                    console.log("Currently available: " + numberOfItems);
                    console.log("Quantity requested: " + quantityRequested);
                    if(numberOfItems < quantityRequested)
                    {
                        console.log("Insufficient quantity...");
                        buyProduct();
                    }
                    else
                    {
                        numberOfItems-=quantityRequested;
                        console.log("Amount of items left in stock after purchase: " + numberOfItems);

                        var totalCost = res[i].price * quantityRequested;
                        console.log("Total cost: $" + totalCost);
                        console.log("-----------------------");

                        connection.query("UPDATE products SET stock_quantity = " + numberOfItems + " WHERE item_id = " + itemRequested);

                        buyignMoreItems();
                    }
                }
            }
        })
    }
}

buyProduct();

function buyignMoreItems() {
    inquirer.prompt([
        {
            type:"list",
            name: "another",
            message: "Would you like to continue shopping?",
            choices: ["yes", "no"]
        }
    ])
    .then(function(response){
        console.log(response.another);
        connection.query("SELECT * FROM products", function(error,res){
            if(error)
            {
                console.log(error);
            }
            else{
                if(response.another == "yes")
                {
                //console.log(res);
                for(var i = 0; i < res.length; i++)
                {
                    console.log("Product ID: ",res[i].item_id);
                    console.log("Product name: ",res[i].product_name);
                    console.log("Price: ",res[i].price);
                    console.log("-----------------------");
                }

                buyProduct();
                }
                else
                {
                    console.log("-----------------------");
                    console.log("Thank you for visiting BAMAZON today!");
                    connection.end();
                }
            }
        })
    })
}