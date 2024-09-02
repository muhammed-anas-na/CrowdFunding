"use client";
import React,{useContext} from "react";
import Link from "next/link";
import { CrowdFundingContext } from "@/context/crowdFundingContext";

function Hero() {
  const {currentAccount} = useContext(CrowdFundingContext);

  return (
    <div className="h-screen">
      <div className="relative h-4/5">
        <img
          className="h-full w-full object-cover rounded-xl"
          src="hero.jpg"
          alt="hero.jpg"
        />
        <div className="flex absolute md:bottom-0 md:left-0 ">
            <h1 className="font-extrabold md:text-9xl p-4 text-white">DFund</h1>
        </div>

        <div className="flex absolute bottom-0 right-0 p-5">
          {
            currentAccount ? (
              <Link href={'/create-raising'} className="bg-default-green px-8 rounded-lg py-3 font-bold">Start Fundraising</Link>

            ) : (
              <button onClick={()=>alert("Connect to your wallet")} className="bg-default-green px-8 rounded-lg py-3 font-bold">Start Fundraising</button>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default Hero;
