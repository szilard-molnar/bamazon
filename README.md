# bamazon

This is a basic "Amazon" application running in the command line. There are 10 items that the user can purchase, the database that contains the table with the availabe products with their descripitions was created with MySQL.

When the the app starts running the user will be asked to identify the item he wants to pruchase by its ID number. Since it is identical it will find the relevant item right away. Then the app asks how many items the user would like to buy. After this step the user will get:
  - The name of the item
  - Number of currently available items
  - Quantity of the requested item
  - The amount of items left in store after purchase
  - Total cost of purchase in $.
  
The app updates the database in My SQL upon request.

If the requested amount exceeds the amount that is currently available, the system sends a message about it.
  
After the purchase the application asks if the user would like to continue shopping. If yes, then the app displays the items again, and the purchasing process begins again. If not, then the app stops working, and the user gets back to the command line with a "Thank You" message.

Below is a video.
https://drive.google.com/file/d/1MUSuzJjSGcQ0GGEQB0GthEzdiwpZIopq/view
