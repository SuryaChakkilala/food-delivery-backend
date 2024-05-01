const sellercontroller = require("../controllers/sellercontroller")
const express = require('express')
const seller = require("../models/Seller")
const { DeleteSeller } = require("../controllers/admincontroller")
const sellerrouter = express.Router()

const middleware = require('../middleware')

// router.get('/demo', demo)

sellerrouter.post("/sellerregister",sellercontroller. SellerSignUp)

sellerrouter.post("/sellerlogin",sellercontroller. SellerLogin)

sellerrouter.post("/adddeliveryboys",sellercontroller. AddDeliveryBoys)

sellerrouter.get("/viewdeliveryboys",sellercontroller. ViewDeliveryBoys)


sellerrouter.get("/viewitems",sellercontroller. ViewItems)

sellerrouter.get("/profile",sellercontroller, middleware, UserProfile)

// router.get('/customerhomepage', UserHomePage)

// router.delete('/deletecustomer/:id', DeleteUser)

//router.delete('/deleteseller/:id',DeleteSeller)

sellerrouter.get("/cart",sellercontroller, middleware, GetUserCartPage)

sellerrouter.get("/order",sellercontroller. GetOrders)

sellerrouter.get("/viewtrans",sellercontroller. GetAllOrders)

//sellerrouter.get("/editorderdetails/:id",sellercontroller. OrderStatus)

sellerrouter.put("/updateorderdetails/:id", sellercontroller.UpdateOrders)


module.exports = sellerrouter