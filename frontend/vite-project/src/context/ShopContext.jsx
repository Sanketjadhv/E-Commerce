import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './authContext'
import axios from 'axios'
import { userDataContext } from './userContext'
import { getUserCart } from '../../../../backend/controller/cartController'

export const shopDataContext = createContext()

function ShopContext({children}) {
    let {userData} = useContext(userDataContext)
    let [products, setProducts] = useState([])
    let [search , setSearch] =useState('')
    let [showSearch , setShowSearch] =useState(false)
    let [loading, setLoading] = useState(false);
    let {serverUrl} = useContext(authDataContext)
    let currency ="₹";
    let delivery_fee = 40;
    let [cartItem, setCartItem] = useState({});


    const getProducts = async()=>{
        try{
            let result = await axios.get(serverUrl+"/api/product/list")
            console.log(result.data)
            setProducts(result.data)
        }catch(error){
            console.log(error)
        }
    }



    const addToCart = async(itemId, size) =>{
        if(!size){
            console.log("select Product Size")
            return;
        }

        setLoading(true)

    let cartData = structuredClone(cartItem);  //clone the product
    if(cartData[itemId]){
        if(cartData[itemId][size]){
            cartData[itemId][size] += 1;
        }else{
            cartData[itemId][size] = 1;
        }
    }else{
        cartData[itemId] = {};
        cartData[itemId][size] = 1;
    }

    setCartItem(cartData);

    if(userData){
        try{
            let result = await axios.post(serverUrl+'/api/cart/add',{itemId,size}, {withCredentials:true})
            console.log(result.data)
            setLoading(false)
        }catch(error){
            console.log(error)
            setLoading(false)
        }
    }
    }


    const getUserCart = async(req,res) =>{
        try{
            const result = await axios.post(serverUrl +'/api/cart/get',{},{withCredentials:true})
            setCartItem(result.data)
        }catch(error){
            console.log(error)
        }
    }

  const updateQuantity = async(itemId, size, quantity) =>{
    let cartData = structuredClone(cartItem);
    cartData[itemId][size] = quantity
    setCartItem(cartData)
 if(userData){
        try{
            await axios.post(serverUrl +"/api/cart/update",{itemId, size, quantity}, {withCredentials:true})
        }catch(error){
            console.log(error)
        }
    }
}

    const getCartCount = () =>{
        let totalCount = 0;
        for(const items in cartItem){
            for(const item in cartItem[items]){
                try{
                    if(cartItem[items][item] > 0){
                        totalCount += cartItem[items][item]
                    }
                }
                catch(error){

                }
            }
        }
        return totalCount;
    }

    const getCartAmount = () =>{
        let totalAmount = 0;
        for(const items in cartItem){
            let itemInfo = products.find((product)=> product._id === items);
            for(const item in cartItem[items]){
                try{
                    if(cartItem[items][item] > 0){
                        totalAmount += itemInfo.price * cartItem[items][item];
                    }
                }
                catch(error){
                        console.log(error)
                }
            }
        }
        return totalAmount
    }

    useEffect(()=>{
        getProducts()
    },[])

    useEffect(()=>{
        getUserCart()
    },[])


    let value={
        products, currency, delivery_fee , getProducts,search , setSearch ,showSearch , setShowSearch , getCartCount , setCartItem , addToCart, updateQuantity, getCartAmount, cartItem
    }

  return (
    <>
    <div>
        <shopDataContext.Provider value={value}>
        {children}
        </shopDataContext.Provider>
    </div>
    </>
  )
}

export default ShopContext