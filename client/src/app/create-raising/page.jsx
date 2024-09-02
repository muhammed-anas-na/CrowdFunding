"use client"
import { CrowdFundingContext } from '@/context/crowdFundingContext';
import React, { useState , useContext } from 'react'


function page() {
    const [title, setTitle] = useState("");
    const [description, setDesc] = useState();
    const [amount,setAmount] = useState("");
    const [deadline, setDeadline] = useState("")
    const {createCampaign} = useContext(CrowdFundingContext)
    const handleSubmission = async()=>{
      await createCampaign({
        title,description,amount,deadline
      })
    }
    
  return (
    <div className="flex h-screen my-5 gap-5 overflow-hidden">
    <div className="flex flex-col items-start justify-center w-1/2 md:ms-28 ms-10">
        <h1 className="flex-start font-bold text-3xl">Create a Fundraising</h1>
        <p className="text-xs text-gray-500">Do you have a reason to raise fund? The world is with you</p>
        <label htmlFor="email" className="mt-4 text-sm font-semibold">Title</label>
        <input type="text" value={title} name="title" onChange={(e)=>{setTitle(e.target.value)}}
        className="border rounded-lg focus:outline-0 focus:border-green-800 w-72" />

        <label htmlFor="Description" className="mt-4 text-sm font-semibold">Description</label>
        <textarea type="text" value={description} name="Description"  onChange={(e)=>{setDesc(e.target.value)}}
        className="border rounded-lg focus:outline-0 focus:border-green-800 w-72" />

        <label htmlFor="target" className="mt-4 text-sm font-semibold">Target</label>
        <input type="number" value={amount}  name="target"  onChange={(e)=>{setAmount(e.target.value)}}
        className="border rounded-lg focus:outline-0 focus:border-green-800 w-72" />

        <label htmlFor="deadline" className="mt-4 text-sm font-semibold">Deadline</label>
        <input type="date" name="deadline"  onChange={(e)=>{setDeadline(e.target.value)}}
        className="border rounded-lg focus:outline-0 focus:border-green-800 w-72" />

        <button className="border mt-3 w-72 py-1 bg-green-800 text-white rounded-lg" onClick={handleSubmission}>Create</button>
    </div>
    <div className="w-1/2 hidden md:block">
        <img src="/helping-hand.jpg" alt="image" className="object-cover h-full w-full rounded-2xl"/>
    </div>
</div>
  )
}

export default page
