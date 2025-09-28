import Order from '../model/orderModel.js'
import User from '../model/userModel.js'


export const PlaceOrder = async (req,res)=>{
 try{
    const {items, amount, address} = req.body
    const userId = req.userId;
    const orderData = {
        userId,
        items,
        amount,
        address,
        paymentMethod:'COD',
        payment:false,
        date: Date.now()
    }
    const newOrder = new Order(orderData)
    await newOrder.save()

    await User.findByIdAndUpdate(userId,{cartData:{}})

    return res.status(201).json({message:'Order Place'})

 }catch(error){
    console.log(error)
    res.status(500).json({message:'order Place error'})
 }
}


//for user
export const userOrders  = async(req,res) =>{
   try{
      const userId = req.userId;
      const orders = await Order.find({userId})
      return res.status(200).json(orders)
   }catch(error){
      console.log(error)
      return res.status(500).json({message:"usersOrders error"})
   }
}


//for admin

export const allOrders = async(req,res)=>{
   try{
  const orders = await Order.find({})
       return res.status(200).json(orders)
   }catch(error){
      return res.status(500).json({message:"adminAllOrders error"})
   }
}

//update status for admin

export const updateStatus = async(req, res) =>{
   try{
      const {orderId, status} = req.body
      await Order.findByIdAndUpdate(orderId, {status})
      return res.status(201).json({message:'status updated'})
   }catch(error){
      return res.status(500).json({message:error.message})
   }
}

