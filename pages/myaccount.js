import React, { useState } from 'react'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import Link from 'next/link'
import User from '../models/User'
const Checkout = ({ cart, AddToCart, RemoveFromCart, subTotal }) => {
  const [edisabled, setedisabled] = useState(true)
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [address, setaddress] = useState('')
  const [phone, setPhone] = useState('')
  const [pincode, setPincode] = useState('')
  const setdis = (e) => {
    if (e.target.name == 'name') {
      setname(e.target.value)
    }
    else if (e.target.name == 'email') {
      setemail(e.target.value)
    }
    else if (e.target.name == 'address') {
      setaddress(e.target.value)
    }
    else if (e.target.name == 'phone') {
      setPhone(e.target.value)
    }
    else if (e.target.name == 'pincode') {
      setPincode(e.target.value)
    }
    if (name.length > 3 && email.length > 3 && address.length > 3 && phone.length > 3 && pincode) {
      setedisabled(false)
    }
  }
  return (
    <div className='m-auto container'>
      <h2 >1. Delivery Details</h2>
      <div className="m-auto flex">
        <div className="px-2 w-1/2">
          <div className="relative mb-4">
            <label htmlFor="name" className='leading-7 text-sm text-gray-600 '>Your Name</label>
            <input id="name" name="name" onChange={setdis} value={User.email} type="text" autoComplete="email" required className="w-full rounded border bg-white border-gray-200  focus:border-pink-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"  placeholder="Your name" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="relative mb-4">
            <label htmlFor="name" className='leading-7 text-sm text-gray-600 '>Your email (email can't be updated)</label>
            <input id="name" name="email" onChange={setdis} value={email} type="email" autoComplete="email" required className="w-full rounded border bg-white border-gray-200  focus:border-pink-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly />
          </div>
        </div>
      </div>
      <div className="px-2 ">
        <div className="mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600 dark:text-gray-400">Address</label>
          <textarea minLength="2" maxLength="400" name="address" onChange={setdis} value={address} id="address" cols="30" rows="2" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
        </div>
      </div>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600 dark:text-gray-400">Phone Number</label>
            <input minLength="10" maxLength="10" placeholder="Your 10 Digit Phone Number" type="phone" id="phone" name="phone" onChange={setdis} value={phone} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600 dark:text-gray-400">PinCode (India)</label>
            <input minLength="6" maxLength="6" type="text" id="pincode" name="pincode" onChange={setdis} value={pincode} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600 dark:text-gray-400">State</label>
            <input type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="district" className="leading-7 text-sm text-gray-600 dark:text-gray-400">District</label>
            <input type="text" id="district" name="district" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>
      <h2 className="font-semibold text-xl">2. Review Cart Items & Pay</h2>
      <div className="w-[100%]  sidebar justify-center md:justify-start  overflow-hidden  px-5 py-10 rounded-xl bg-pink-100 my-2">
        <ol className='list-decimal ml-3'>
          {Object.keys(cart).length === 0 && <div className='my-4 font-semibold'>Your cart is empty.</div>}
          {Object.keys(cart).map((k) => {
            return <li key={k}>
              <div className="item flex">
                <div className='w-2/3 font-semibold'>{cart[k].name} ({cart[k].size}/{cart[k].variant})</div>
                <div className='w-1/3 font-semibold flex'><AiOutlineMinusCircle onClick={() => { RemoveFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='text-pink-500' /><span className='relative bottom-2 p-1'>{cart[k].qty}</span><AiOutlinePlusCircle onClick={() => { AddToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='text-pink-500' /></div>
              </div>
            </li>
          })}
        </ol>
        <div className='total my-3'>Subtotal: ₹ {subTotal}</div>
        <Link href={'/Checkout'}> <button disabled={edisabled} className="flex mr-2 disabled:bg-pink-300 text-white bg-pink-500 border-0 p-2 focus:outline-none hover:bg-pink-600 rounded text-sm"> pay : ₹ {subTotal} </button></Link>
      </div>

    </div>
  )
}

export default Checkout