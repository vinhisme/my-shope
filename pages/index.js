import React from 'react'
import { Product, Footer, FooterBanner, Herobanner } from '../components'
import { client } from '../lib/client'

const Home = ({ products, bannerData }) => {
  console.log("🚀 ~ file: index.js:6 ~ Home ~ bannerData:", bannerData)
  return (
    <>
      <Herobanner heroBanner={bannerData.length && bannerData[0]} />
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className='products-container'>
        {products?.map((product) => <Product key={product._id} product={product} />)}
      </div>

      <FooterBanner footerbanner={bannerData && bannerData[0]} />
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerquery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerquery);

  return {
    props: { products, bannerData }
  }
}
export default Home