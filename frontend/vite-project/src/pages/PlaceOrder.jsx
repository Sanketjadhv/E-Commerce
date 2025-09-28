import React, { useContext, useState } from 'react'
import Title from '../components/Title';
import CartTotal from './../components/CartTotal';
import rozerpay from '../assets/rozerpay.png'
import { shopDataContext } from '../context/ShopContext';
import userContext from '../context/userContext';
import { authDataContext } from '../context/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

function PlaceOrder() {
  let [ method, setMethod] = useState('COD')
  let navigate = useNavigate()
  const {cartItem, setCartItem, getCartAmount, delivery_fee, products} = useContext(shopDataContext)
  let {serverUrl} = useContext(authDataContext)
  const [loading , setLoading] = useState(false)

  let [formData, setFormData] = useState({
    firstname:'',
    lastname:'',
    email:'',
    street:'',
    city:'',
    state:'',
    pincode:'',
    country:'',
    phone:''
  })

  const onchangeHandler = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setFormData(data =>({...data,[name]:value}))
  }


    const onSubmitHandler =async(e) =>{
      e.preventDefault();
      try{
        let orderItems = []
        for(const items in cartItem){
          for(const item in cartItem[items]){
            if(cartItem[items][item] > 0){
              const itemInfo = structuredClone(products.find(product => product._id === items))
              if(itemInfo){
                itemInfo.size = item
                itemInfo.quantity = cartItem[items][item]
                orderItems.push(itemInfo)
              }
            }
          }
        }
        let orderData = {
          address:formData,
          items:orderItems,
          amount:getCartAmount() + delivery_fee
        }
        switch(method){
          case 'COD' : 
          const result = await axios.post(serverUrl+'/api/order/placeorder'
          ,orderData, {withCredentials:true})
          console.log(result.data)
          if(result.data){
            setCartItem({})
            toast.success("Order Placed")
            navigate("/order")
          }
          else{
            console.log(result.data.message)
          }
          break;


           default:
             break;
          }

      }catch(error){

        console.log(error)
        toast.error("Order Placed Error")
      }
    }
  return (
  <>
  <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-center flex-col md:flex-row gap-[50px] relative'>
      <div className='lg:w-[50%] w-[100%] h-[100%] flex items-center justify-center lg:mt-[0px] mt-[90px]'>
        <form onSubmit={onSubmitHandler} className='lg:w-[70%] w-[95%] lg:h-[70%] h-[100%]'>
          <div className='py-[10px]'>
            <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
          </div>
          <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>

            <input type='text' placeholder='First name' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]' required onChange={onchangeHandler} name='firstname' value={formData.firstname}/>

            <input type='text' placeholder='Last name' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]' required  onChange={onchangeHandler} name='lastname' value={formData.lastname}/>           
          </div>

          <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
            <input type='email' placeholder='Email address' className='w-[100%] h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-[white] text-[18px] px-[20px]' required onChange={onchangeHandler} name='email' value={formData.email} />

          </div>
           <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
            <input type='text' placeholder='Street' className='w-[100%] h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-[white] text-[18px] px-[20px]' required onChange={onchangeHandler} name='street' value={formData.street} />

          </div>

          <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>

            <input type='text' placeholder='City' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]' required onChange={onchangeHandler} name='city' value={formData.city} />

            <input type='text' placeholder='State' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]' required onChange={onchangeHandler} name='state' value={formData.state} />           
          </div>

          <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>

            <input type='text' placeholder='Pincode' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]' required onChange={onchangeHandler} name='pincode' value={formData.pincode} />

            <input type='text' placeholder='Country' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]' required onChange={onchangeHandler} name='country' value={formData.country} />           
          </div>

            <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
            <input type='text' placeholder='Phone' className='w-[100%] h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-[white] text-[18px] px-[20px]' required onChange={onchangeHandler} name='phone' value={formData.phone} />

          </div>
          <div>
            <button type='submit' className='text-[18px] active:bg-slate-500 cursor-pointer bg-[#3bcee848] py-[10px] px-[50px] rounded-2xl text-white flex items-center justify-center gap-[20px] absolute lg:right-[15%] bottom-[8%] right-[35%] border-[1px] border-[#80808049] ml-[30px] mt-[20px] md:bottom-[10%] '>PLACE ORDER</button>
          </div>
        </form>
      </div>

      <div className='lg:w-[50%] w-[100%] min-h-[100%] flex items-center justify-center gap-[30px]'>
        <div className='lg:w-[70%] w-[90%] lg:h-[70%] h-[100%] flex items-center justify-center gap-[10px] flex-col'>
          <CartTotal/>

          <div className='py-[10px]'>
            <Title text1={'PAYMENT'} text2={'METHOD'} />
            <div className='w-[100%] h-[30vh] lg:h-[100px] flex items-center mt-[20px] lg:mt-[0px] justify-center gap-[50px]'>
              <button onClick={()=>setMethod('razorpay')} className={`w-[150px] h-[50px] mb-[200px] md:mb-[80px] rounded-sm items-center justify-center  bg-gradient-to-t from-[#95b3f8] to-white  ${method === 'razorpay' ? 'border-[5px] border-blue-900 rounded-sm' : ' ' }`}>{loading ?<Loading/> :  <img src={rozerpay} className='w-[100%] h-[100%] object-contain rounded-sm' alt=" " /> }</button>
              <button onClick={()=>setMethod('COD')} className={`w-[200px] h-[50px] mb-[200px] md:mb-[80px]   bg-gradient-to-t from-[#95b3f8] to-[white] text-[14px] px-[20px] rounded-sm text-[#332f6f] font-bold ${method === 'COD'?'border-[5px] border-blue-900 rounded-sm':''} `}>{loading ? <Loading/> :"CASH ON DELIVERY"}</button>
            </div>
          </div>
        </div>
      </div>
  </div>
  </>
  )
}

export default PlaceOrder
