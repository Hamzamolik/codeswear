import Link from 'next/link'
import React from 'react'
import mongoose from "mongoose";
import Products from '../models/product'


const Tshirts = ({ products }) => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-14 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {Object.keys(products).map((item) => {
              return <Link passHref={true} href={`/products/${products[item].slug}`} key={products[item]._id} > <div className="lg:w-full h-[100%] md:w-1/2 p-4 shadow-lg cursor-pointer m-5 w-full object-cover">
                <a className="block relative  rounded overflow-hidden">
                  <img alt="ecommerce" className="m-auto h-[30vh] md:h-[36vh] block md:mx-0" src={`${products[item].img}`} />
                </a>
                <div className="mt-4 text-center md:text-left">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{products[item].catagory}</h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                  <p className="mt-1 ">₹{products[item].price}</p>
                  <div className="mt-1 ">
                    {products[item].size.map((itemsize) => {
                      console.log(itemsize)
                      return products[item].size.includes(itemsize) && <span className='px-1 mx-1 border border-gray-600'> {itemsize}</span>

                    })}
                  </div>
                  <div className="mt-1 ">
                    {products[item].color.includes('pink') && <button className={`border-2 border-gray-300 mx-1 bg-pink-700  rounded-full w-6 h-6 focus:outline-none`}></button>}
                    {products[item].color.includes('red') && <button className={`border-2 border-gray-300 mx-1 bg-red-700  rounded-full w-6 h-6 focus:outline-none`}></button>}
                    {products[item].color.includes('gray') && <button className={`border-2 border-gray-300 mx-1 bg-gray-700  rounded-full w-6 h-6 focus:outline-none`}></button>}
                    {products[item].color.includes('blue') && <button className={`border-2 border-gray-300 mx-1 bg-blue-700  rounded-full w-6 h-6 focus:outline-none`}></button>}
                    {products[item].color.includes('pink') && <button className={`border-2 border-gray-300 mx-1 bg-pink-700  rounded-full w-6 h-6 focus:outline-none`}></button>}
                    {products[item].color.includes('purple') && <button className={`border-2 border-gray-300 mx-1 bg-purple-700  rounded-full w-6 h-6 focus:outline-none`}></button>}
                    {products[item].color.includes('green') && <button className={`border-2 border-gray-300 mx-1 bg-green-700  rounded-full w-6 h-6 focus:outline-none`}></button>}
                  </div>
                </div>
              </div>
              </Link>
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect('mongodb://127.0.0.1:27017/codswear')
  }
  let products = await Products.find({catogory:'tshirts'})
  let tshirts = {}
  for (let item of products) {
    if (item.title in tshirts) {
      if (!tshirts[item.title].color.includes(item.color) && item.availablquantity > 0) {
        tshirts[item.title].color.push(item.color)
      }
      if (!tshirts[item.title].size.includes(item.size) && item.availablquantity > 0) {
        tshirts[item.title].size.push(item.size)
      }
    }
    else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availablquantity > 0) {
        tshirts[item.title].color = [item.color]
        tshirts[item.title].size = [item.size]
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(tshirts)) }
  }
}
export default Tshirts