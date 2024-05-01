const customercontroller = require("../controllers/customercontroller")
const express = require('express')
const customer = require("../models/Customer")
const customerrouter = express.Router()

const middleware = require('../middleware')



// router.get('/demo', demo)


customerrouter.post("/signup",customercontroller.Signup)

customerrouter.post("/login",customercontroller.Login)

customerrouter.get("/profile",customercontroller, middleware, UserProfile)

customerrouter.post("/cart", customercontroller.CartPage)

customerrouter.get("/viewitems",customercontroller.ViewItems)

customerrouter.get("/cart", customercontroller,middleware, GetUserCartPage)

customerrouter.get("/order", customercontroller.GetOrders)

customerrouter.get("/editorderdetails/:id",customercontroller. OrderStatus)

customerrouter.put("/updateorderdetails/:id",customercontroller. UpdateOrders)

customerrouter.delete("/deletecustomer",customercontroller.DeleteUser)


module.exports = customerrouter