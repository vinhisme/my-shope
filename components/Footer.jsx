import React from 'react'
import Link from "next/link";
import { AiFillInstagram, AiFillFacebook } from 'react-icons/ai'

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>2023 My Audio Store All rights reserverd</p>
      <p className='icons'>
        <AiFillInstagram />
        <AiFillFacebook />
      </p>
    </div>
  )
}

export default Footer