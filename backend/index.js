import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoute.js';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import productRoute from './routes/productRoute.js'
import cartRoutes from './routes/cartroute.js';
import OrderRoutes from './routes/orderRoute.js';

 
dotenv.config()
let app = express();

app.get("/",(req,res)=>{
    res.send(`Hello from server`)
})



app.use(cors({
    origin:["https://task3-1frontend3.onrender.com","https://task3-1admin.onrender.com"],
    credentials:true
}))

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/product",productRoute)
app.use("/api/order",OrderRoutes)


app.use("/api/cart",cartRoutes)


let port = process.env.PORT || 4000
app.listen(port,()=>{
    console.log(`hello from server${port}`)
    connectDb()
});

