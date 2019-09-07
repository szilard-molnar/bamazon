var mysql = require("mysql");
var connection = mysql.createConnection({
    host:"localhost",
    port:"8889",
    user:"root",
    password:"root",
    database:"bamazon"
});

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