import express from 'express'
import isAuth from '../middleware/isAuth.js'
import { allOrders, PlaceOrder, updateStatus, userOrders } from '../controller/orderController.js'
import adminAuth from './../middleware/adminAuth.js';

const OrderRoutes = express.Router()

OrderRoutes.post("/placeorder",isAuth,PlaceOrder) 
//for user 
OrderRoutes.post("/userorder",isAuth,userOrders)  
//for admin
OrderRoutes.post("/list",adminAuth,allOrders)  

OrderRoutes.post("/status",adminAuth,updateStatus)  

export default OrderRoutes