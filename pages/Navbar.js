import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AiFillCloseCircle, AiOutlineMinusCircle, AiOutlinePlusCircle, AiOutlineShoppingCart } from 'react-icons/ai'
import { BsFillBagCheckFill, BsPiggyBank } from 'react-icons/bs'
import { MdAccountCircle } from 'react-icons/md'
import { useRouter } from 'next/router'
const Navbar = ({ cart, RemoveFromCart, AddToCart, clearcart, subTotal }) => {
    const router = useRouter()
    const [user, setuser] = useState({ value: null })
    const [key, setkey] = useState(0)
    const [toggledroprdownn, settoggledroprdownn] = useState(false)
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setuser({ value: token })
            setkey(Math.random())
        }
    }, [router.query])
    const logout=()=>{
        localStorage.removeItem('token')
        setuser({value:null})
    }

    const togglecart = () => {
        if (ref.current.classList.contains('translate-x-full')) {
            ref.current.classList.remove('translate-x-full')
            ref.current.classList.add('translate-x-0')
        }
        else if (!ref.current.classList.contains('translate-x-full')) {
            ref.current.classList.add('translate-x-full')
            ref.current.classList.remove('translate-x-0')
        }
    }
    const ref = useRef()
    return (
        <>
            <div className="flex flex-col my-5 top-0 md:flex-row md:justify-start justify-between z-10  items-center shadow-md sticky ">
                <div className="logo mr-auto md:mr-5 mx-5">
                    <Link href={'/'}><img src={'/logo.png'} width={200} height={40} /></Link>
                </div>
                <div className="nav">
                    <ul className="flex items-center space-x-2 font-bold md:text-xl py-2">
                        <Link href={'/'}><li>About</li></Link>
                        <Link href={'/'}><li>Contact</li></Link>
                        <Link href={'/stickers'}><li>Stickers</li></Link>
                        <Link href={'/Hoodies'}><li>Hoodies</li></Link>
                        <Link href={'/Tshirts'}><li>Tshirts</li></Link>
                        <Link href={'/Mugs'}><li>Mugs</li></Link>
                    </ul>
                </div>
                <div onClick={togglecart} ref={ref} className="cart absolute right-1 top-1">
                    <button><AiOutlineShoppingCart className='text-xl md:text-4xl' /></button>
                </div><div className="cart items-center absolute right-14 top-1">
                    <a onMouseOver={()=>{settoggledroprdownn(true)}} onMouseLeave={()=>{settoggledroprdownn(false)}}>
                        {toggledroprdownn && <div className="absolute top-7 right-8 px-5 w-36 rounded-md bg-pink-300">
                            <ul>
                                <Link href={'/account'}><li className='px-1 text-sm hover:text-pink-700 cursor-pointer'>My account</li></Link>
                               <Link href={'/Orders'}><li className='px-1 text-sm hover:text-pink-700 cursor-pointer'>Orders</li></Link>
                               <li onClick={logout} className='px-1 text-sm hover:text-pink-700 cursor-pointer'>Log out</li>
                            </ul>
                        </div>}
                        {user.value !== null && <button><MdAccountCircle className='text-xl md:text-4xl' /></button>}</a>
                    {user.value == null && <Link href={'/Login'}>
                        <button className='bg-pink-600 text-white rounded-md px-2 py-1 mx-2 text-sm' >Logn in</button>
                    </Link>}</div>
                <div ref={ref} className={`w-72 h-[101vh] sidebar overflow-y-scroll fixed overflow-hidden right-0 px-5 py-10 top-[-20px] bg-pink-100 transform transition-transform ${Object.keys(cart).length !== 0 ? 'translate-x-0' : 'translate-x-full'}`}>
                    <h2 className='text-xl  font-bold'>Checkout</h2>
                    <span onClick={togglecart} className='absolute top-5 right-3 cursor-pointer text-pink-500'><AiFillCloseCircle /></span>
                    <ol className='list-decimal'>
                        {Object.keys(cart).length === 0 && <div className='my-4 font-semibold'>Your cart is empty.</div>}
                        {Object.keys(cart).map((k) => {
                            return <li key={k}>
                                <div className="item flex">
                                    <div className='w-2/3 font-semibold'>{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
                                    <div className='w-1/3 font-semibold flex'><AiOutlineMinusCircle onClick={() => { RemoveFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='text-pink-500' /><span className='relative bottom-2 p-1'>{cart[k].qty}</span><AiOutlinePlusCircle onClick={() => { AddToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='text-pink-500' /></div>
                                </div>
                            </li>
                        })}
                    </ol>
                    <div className='total m-3 -ml-3'>Subtotal: ₹ {subTotal}</div>
                    <div className="flex">
                        <Link href={'/Checkout'}> <button className="flex mr-2 text-white bg-pink-500 border-0 p-2 focus:outline-none hover:bg-pink-600 rounded text-sm"><BsFillBagCheckFill className='mr-1 relative top-1 ' /> Checkout </button></Link>
                        <button className="flex ml-2  text-white bg-pink-500 border-0 p-2 focus:outline-none hover:bg-pink-600 rounded"><BsPiggyBank className='mr-1 ml-3 top-1 relative' /> <span onClick={clearcart}>Clear Cart</span> </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Navbar