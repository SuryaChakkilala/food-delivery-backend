const admincontroller = require("../controllers/admincontroller")
const express = require('express')
const admin = require("../models/Admin")
const adminrouter = express.Router()

//const middleware = require('../middleware')



// router.get('/demo', demo)


adminrouter.post("/adminsignup",admincontroller.AdminSignUp)

adminrouter.post("/adminlogin",admincontroller.AdminLogin)

adminrouter.get("/viewcustomers", admincontroller.ViewCustomers)



adminrouter.get("/viewdeliveryboys", admincontroller.ViewDeliveryBoys)

adminrouter.get("/viewsellers", admincontroller.ViewSellers)

adminrouter.get("/viewitems", admincontroller.ViewItems)

adminrouter.delete("/deletecustomer/:id", admincontroller.DeleteUser)

adminrouter.delete("/deleteseller/:id", admincontroller.DeleteSeller)

adminrouter.get("/viewtrans", admincontroller.GetAllOrders)

adminrouter.get("/editorderdetails/:id", admincontroller.OrderStatus)



module.exports = adminrouter