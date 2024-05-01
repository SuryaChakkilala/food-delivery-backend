const mongoose = require("mongoose")
const express = require("express")
const mongoDB = require("mongodb")
const cors = require("cors")
const routes = require("./routes/adminroutes")
const multer = require("multer")

 const dburl = 'mongodb://localhost:27017/sdpproject32';

 const db = async () => {
     try{
         mongoose.connect(dburl)
         console.log('Connected to the Database');
     }
    catch(error){
         console.log(console.log(error))
     }
 }


const AddItem = require('./models/Item')

const app = express();
app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(routes)

const port = 2032;
app.listen(port, () => {
    console.log(`Port Listen ${port}`)
})
module.exports= db();

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, '../public/uploads/')
    },
    filename: (req, file, callback) => {
        const uniqueSuffix = Date.now()
        callback(null, uniqueSuffix + file.originalname);
    }
})

const upload = multer({ storage: storage })

app.post('/additems', upload.single('image'), async (req, res) => {

    const image = req.file.filename
    const Itemname = req.body.Itemname
    const Category = req.body.Category
    const SubCategory = req.body.SubCategory
    const Price = req.body.Price

    try {

        await AddItem.create({
            image: image, Itemname: Itemname,
            Category: Category, SubCategory: SubCategory, Price: Price
        })
        res.status(200).send('added')

    }
    catch (err) {

        res.status(500).send('Error')

    }
})