const express = require('express')
// const sellers = require("../models/Seller")
// const AdminSchema = require("../models/Admin");
const customer = require("../models/Customer");
//const deliverboy = require("../models/DeliveryBoy");
const items = require("../models/Item");
const orders = require("../models/Order");


const Signup = async (req, res) => {

    try {
        const { fullname, phonenumber, email, password } = req.body;
        let exist = await customer.findOne({ email: email })
        if (exist) {
            return res.status(400).send("User Already Exist")
        }
        let newUser = new customer({
            fullname,
            phonenumber,
            email,
            password
        })
        await newUser.save()
        res.status(200).send("Register Successfully")
    }
    catch (err) {
        return res.status(400).send("Internal Server Error")
    }
}

const Login = async (req, res) => {

    try {
        const { email, password } = req.body;
        let exist = await customer.findOne({ email });
        if (!exist) {
            return res.status(400).send("User Not Found")
        }
        if (exist.password !== password) {
            return res.status(400).send("Invalid Credentials")
        }

        let payload = {
            user: {
                id: exist.id
            }
        }

        jwt.sign(payload, 'jwtSecret',

            (err, token) => {
                if (err) throw err
                return res.json({ token })
            }
        )
    }

    catch (err) {
        return res.status(400).send("Internal Server Error")
    }

}

const UserHomePage = (req, res) => {
    items.find()
        .then(item => res.json(item))
        .catch(err => console.log(err))
}

const UserProfile = async (req, res) => {
    try {
        let exist = await customer.findById(req.user.id)
        if (!exist) {
            return res.status(400).send("User not found")
        }
        res.json(exist)
    }
    catch (err) {
        return res.status(500).send("Server Error")
    }
}

const ViewItems = (req, res) => {
    items.find()
        .then(items => res.json(items))
        .catch(err => console.log(err))
}

const CartPage = async (req, res) => {
    try {
        const { cart } = req.body;
        const { data } = req.body;

        let total = 0;
        cart.map((i) => {
            total += i.Price;
        });
        const order = new Order({
            Products: cart,
            Users: data._id,
        })
        order.save()
        res.status(200).send('Order Placed')
    }
    catch (err) {
        console.log(err)
    }
}

const GetUserCartPage = async (req, res) => {
    try {
        let exist = await customer.findById(req.user.id)
        if (!exist) {
            return res.status(400).send("User not found")
        }
        res.json(exist)
    }
    catch (err) {
        return res.status(500).send("Server Error")
    }
}

const GetOrders = (req, res) => {
    orders.find().populate("Users", "fullname").populate("Products", "-photo")
        .then(orders => res.json(orders))
        .catch(err => console.log(err))
}

const OrderStatus = (req, res) => {
    const id = req.params.id;
    orders.findById({ _id: id })
        .populate("Users", "fullname")
        .populate("Products", "-photo")
        .then(orders => {
            res.json(orders)
        })
        .catch(err => {
            res.json(err)
        })
}

const UpdateOrders = (req, res) => {
    const id = req.params.id
    orders.findByIdAndUpdate({ _id: id }, { status: req.body.status })
        .then(orders => {
            res.json(orders)
        })
        .catch(err => {
            res.json(err)
        })
}


const DeleteUser = (req, res) => {
    const id = req.params.id;
    customer.findByIdAndDelete({ _id: id })
        .then(res => res.json(res))
        .catch(err => console.log(err))
}

module.exports = {Signup,Login,UserHomePage,UserProfile,ViewItems,CartPage,GetUserCartPage,GetOrders,OrderStatus,UpdateOrders,DeleteUser}