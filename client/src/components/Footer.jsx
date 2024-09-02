import React from 'react'

function Footer() {
  return (
    <div className='text-white bg-black mt-10 h-auto rounded-lg mb-10 flex flex-col justify-center px-10 py-6'>
        <div className='flex md:flex-row flex-col gap-5 justify-between items-center'>
          <h1 className='text-5xl font-bold'>Fund IT</h1>
          <div className='flex gap-3 md:gap-16 text-xs'>
          <div>
                <h1 className='font-bold md:text-xl mb-2'>Donate</h1>
                <p>Education</p>
                <p>Social</p>
                <p>Medicine</p>
                <p>Disaster</p>
              </div>
              <div>
                <h1 className='font-bold md:text-xl mb-2'>Help</h1>
                <p>FAQ</p>
                <p>Privacy policy</p>
                <p>Accesiblity</p>
                <p>Contact Us</p>
              </div>
              <div>
                <h1 className='font-bold md:text-xl mb-2'>Company</h1>
                <p>About Us</p>
                <p>Careers</p>
                <p>Service</p>
                <p>Pricing</p>
              </div>
          </div>
        </div>
    </div>
  )
}

export default Footer
