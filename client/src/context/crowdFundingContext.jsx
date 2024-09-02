"use client";
import React, {useState, useEffect} from "react";
import { TaskContractAddress } from "../../config";
import TaskContracts from './CrowdFunding.json';
import { ethers } from "ethers";

export const CrowdFundingContext = React.createContext();

export const CorwdFundingProvider = ({ children }) => {
    
  const [currentAccount , setCurrentAccount] = useState('');  
    

  const connectWallet = async () => {
    console.log("Connect wallet function")
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Metamask not detected");
        return;
      }
      const chainId = await ethereum.request({ method: "eth_chainId" });
      console.log("Connected to chain : ", chainId);

      const rinkybyChainId = "0x4";
      const sepoliaChainId = "0xaa36a7";
      if (chainId !== sepoliaChainId) {
        alert("You are not connected to the Sepolia Test Network!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Found Account : ", accounts[0]);
      setCurrentAccount(accounts[0])
    } catch (err) {
      console.log(err);
    }
  };

  const disconnectWallet = async() =>{
    setCurrentAccount('');
  }
  const getAllCampaigns = async() =>{
    try{
      const {ethereum} = window;
      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const CrowdFundingContract = new ethers.Contract(TaskContractAddress, TaskContracts.abi, signer)
        let allCampaigns = await CrowdFundingContract.getAllCampaigns();
        
        const parsedCampaigns = allCampaigns.map((campaign, i) => ({
          owner: campaign.owner,
          title: campaign.title,
          description: campaign.description,
          target: ethers.utils.formatEther(campaign.target.toString()),
          deadline: campaign.deadline.toNumber(),
          amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
          pId: i,
      }));
      return parsedCampaigns;
      }else{
        console.log("Ethereum object doesn't exist");
      }
    }catch(err){
      console.log(err)
    }
  }

  const createCampaign = async(data) =>{
    const {title,description,amount,deadline} = data;
    console.log("Data ==>",data)
    try{
      const {ethereum} = window;
      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const CrowdFundingContract = new ethers.Contract(TaskContractAddress, TaskContracts.abi, signer)
        await CrowdFundingContract.createCampaign(
          currentAccount,
          title,
          description,
          ethers.utils.parseUnits(amount,18),
          new Date(deadline).getTime(),
        );
        console.log("Campaign created");
      }else{
        console.log("Ethereum object doesn't exist");
      }
    }catch(err){
      console.log("Error while creating campaign" , err);
    }
  }

  const donateToCampaign = async(pId,amount)=>{
    try{
      const {ethereum} = window;
      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const CrowdFundingContract = new ethers.Contract(TaskContractAddress, TaskContracts.abi, signer)
        const campaignData = await CrowdFundingContract.donateToCampaign(pId, {
          value:  ethers.utils.parseEther(amount),
        })
        await campaignData.wait();
        console.log("Donation success");
        return true;
      }else{
        console.log("Ethereum not found");
        return;
      }
    }catch(err){
      if(err.code == "INSUFFICIENT_FUNDS"){
        console.log("No balance");
        return {
          err:"INSUFFICIENT_FUNDS"
        }
      }
    }
  }

  const getDonators = async(pId)=>{
    try{
      const {ethereum} = window;
      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const CrowdFundingContract = new ethers.Contract(TaskContractAddress, TaskContracts.abi, signer)
        const AllDonators = await CrowdFundingContract.getDonators(pId);
        return AllDonators;
      }else{
        console.log("Ethereum not found");
      }
    }catch(err){
      console.log(err);
    }
  }

  return (
    <CrowdFundingContext.Provider value={{connectWallet, currentAccount, setCurrentAccount, getAllCampaigns, createCampaign, donateToCampaign, disconnectWallet, getDonators}}>
      {children}
    </CrowdFundingContext.Provider>
  );
};
