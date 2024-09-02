"use client";
import { CrowdFundingContext } from '@/context/crowdFundingContext';
import React , {useState,useContext} from 'react'
import LoadingSpinner from './Loading';

function Header() {
  const {connectWallet, currentAccount, disconnectWallet} = useContext(CrowdFundingContext);
  const [loading, setLoading] = useState(false);
  return (
    <div className='my-5 flex justify-between'>
      <h1 className='text-xl md:text-4xl font-extrabold'>Fund IT</h1>
      {
        currentAccount ? (
          <button className='rounded-lg bg-red-400 px-4 py-1' onClick={disconnectWallet}>Disconnect Wallet</button>
        ) : (
          <>
            {
              loading == true ? (
                  <LoadingSpinner/>
              ) : (
                <button className='rounded-lg bg-default-green px-4 py-1' onClick={async()=>{
                  setLoading(true);
                  await connectWallet();
                  setLoading(false);
                }}>Connect Wallet</button>
              ) 
            }
          </>
        )
      }
    </div>
  )
}
export default Header
