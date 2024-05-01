const express = require('express')

const sellers = require("../Model/Seller")
const order = require("../Model/Order")
const items = require("../Model/Item")
const deliverboy = require('../models/DeliveryBoy')
const customer = require('../models/Customer')

const SellerSignUp = async (req, res) => {

    const { ownername, mobilenumber, email, password, address, pincode, city } = req.body

    const data = {
        ownername, mobilenumber, email, password, address, pincode, city
    }

    try {

        let exist = await sellers.findOne({ email: email })
        if (exist) {
            res.json("exist")
        }
        else {
            res.json("notexist")
            await sellers.insertMany([data])
        }

    }
    catch (err) {
        res.json("Something went wrong !")
    }

}

const SellerLogin = async (req, res) => {

    const { email, password } = req.body
    try {
        let exist = await sellers.find({ email: email })
        if (exist) {
            res.json('exist')
        }
        else {
            res.json('notexist')
        }

    }
    catch (err) {
        res.json('Something went wrong')
    }
}

const ViewItems = (req, res) => {
    items.find()
        .then(items => res.json(items))
        .catch(err => console.log(err))
}

const GetOrders = (req, res) => {
    order.find().populate("Users", "fullname").populate("Products", "-photo")
        .then(orders => res.json(orders))
        .catch(err => console.log(err))
}

const OrderStatus = (req, res) => {
    const id = req.params.id;
    order.findById({ _id: id })
        .populate("Users", "fullname")
        .populate("Products", "-photo")
        .then(orders => {
            res.json(orders)
        })
        .catch(err => {
            res.json(err)
        })
}

const AddDeliveryBoys = async (req, res) => {

    const { fullname, mobilenumber, age } = req.body

    const data = {
        fullname, mobilenumber, age
    }

    try {
        let exist = await deliverboy.findOne({ fullname })

        if (exist) {
            res.json('exist')
        }
        else {
            res.json('notexist')
            await deliverboy.insertMany([data])
        }

    }
    catch (err) {
        console.log(err)
    }
}



const ViewDeliveryBoys = (req, res) => {
    deliverboy.find()
        .then(boys => res.json(boys))
        .catch(err => res.json(err))
}


const UpdateOrders = (req, res) => {
    const id = req.params.id
    order.findByIdAndUpdate({ _id: id }, { status: req.body.status })
        .then(orders => {
            res.json(orders)
        })
        .catch(err => {
            res.json(err)
        })
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

module.exports = {SellerSignUp,SellerLogin,ViewItems,GetOrders,OrderStatus,AddDeliveryBoys,ViewDeliveryBoys,UpdateOrders,UserProfile,GetUserCartPage}