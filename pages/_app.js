import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import '../styles/globals.css'
import Footer from './Footer'
import Navbar from './Navbar'
import LoadingBar from 'react-top-loading-bar'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  const [cart, setcart] = useState({})
  const [progress, setProgress] = useState(0)
  const [subTotal, setsubTotal] = useState(0)
  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setProgress(40)
    })
    router.events.on('routeChangeComplete', () => {
      setProgress(100)
    })
    try {
      if (localStorage.getItem('cart')) {
        setcart(JSON.parse(localStorage.getItem('cart')))
        savecart(JSON.parse(localStorage.getItem('cart')))
      }
    } catch (error) {
      console.log(error)
      localStorage.clear()
    }

  }, [])
  const AddToCart = async (itemcode, qty, price, name, size, variant) => {
    let newcart = cart;
    if (itemcode in cart) {
      newcart[itemcode].qty = cart[itemcode].qty + qty
    }
    else {
      newcart[itemcode] = { qty: 1, price, name, size, variant }
    }
    console.log(JSON.parse(JSON.stringify(newcart)))
    setcart(newcart)
    savecart(newcart)
  }
  const RemoveFromCart = (itemcode, qty, price, name, size, variant) => {
    let newcart = JSON.parse(JSON.stringify(cart));
    if (itemcode in cart) {
      console.log(itemcode)
      newcart[itemcode].qty = cart[itemcode].qty - qty
    }
    if (newcart[itemcode].qty <= 0) {
      delete newcart[itemcode]
    }
    setcart(newcart)
    savecart(newcart)
  }


  const buyNow = (itemcode, qty, price, name, size, variant) => {
    let newcart = {}
    newcart = { itemcode: { qty: 1, price, name, size, variant } }
    setcart(newcart)
    savecart(newcart)
    router.push('/Checkout')
  }

  const savecart = (mycart) => {
    localStorage.setItem('cart', JSON.stringify(mycart))
    let subt = 0;
    let keys = Object.keys(mycart)
    for (let i = 0; i < keys.length; i++) {
      subt += mycart[keys[i]]["price"] * mycart[keys[i]]["qty"]
    }
    setsubTotal(subt)
  }

  const clearcart = () => {
    setcart({});
    savecart({});
  }



  return (
    <>
      <LoadingBar
        color='#ff2d55'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        waitingTime={500}
      />
      <Navbar cart={cart} RemoveFromCart={RemoveFromCart} buyNow={buyNow} AddToCart={AddToCart} savecart={savecart} subTotal={subTotal} clearcart={clearcart} />
      <Component cart={cart} RemoveFromCart={RemoveFromCart} buyNow={buyNow} AddToCart={AddToCart} savecart={savecart} subTotal={subTotal} clearcart={clearcart} {...pageProps} />
      <Footer />
    </>)
}

export default MyApp
