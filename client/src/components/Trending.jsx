"use client";
import { useContext, useEffect, useState } from "react";
import Card from "./Card";
import { CrowdFundingContext } from "@/context/crowdFundingContext";

function Trending() {
  const {getAllCampaigns} = useContext(CrowdFundingContext);
  const [lists,setLists] = useState([]);

  useEffect(()=>{
      async function fetchAllCampaigns(){
        let AllCampaigns = await getAllCampaigns();
        console.log("All campaigns ==>" , AllCampaigns);
        if(AllCampaigns!=undefined){
          setLists(AllCampaigns);
        }
      }
      fetchAllCampaigns();
  },[])
  return (
    <div className='my-10'>
      <h1 className="text-xl md:text-5xl font-bold">Urgent Fundraising!</h1>
      <p className="text-xs md:text-sm text-gray-500">
        Time is of the essence! Join our mission
        <span className="text-sky-600"> NOW </span>
        to make an immediate impact. Every second counts!
      </p>

      <div className='flex flex-col md:flex-row justify-around flex-wrap'>
        {
            lists.map((list,i)=><Card 
            key={i}
            data={list}
            />)
        }
      </div>

    </div>
  )
}

export default Trending
