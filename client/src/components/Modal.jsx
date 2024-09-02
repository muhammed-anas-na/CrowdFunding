"use client";
import { CrowdFundingContext } from "@/context/crowdFundingContext";
import React, { useState, useEffect, useContext } from "react";
import LoadingSpinner from "./Loading";

function Modal({ isOpen, setIsOpen, data }) {
  const [amount, setAmount] = useState("");
  const { donateToCampaign, getDonators } = useContext(CrowdFundingContext);
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState("");
  const [donators, setDonators] = useState([]);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  async function handleSubmit(pId) {
    try {
      setError("");
      setLoading(true);
      const r = await donateToCampaign(pId, amount);
      console.log("r =>", r);
      if (r.err == "INSUFFICIENT_FUNDS") {
        setError("Insufficient fund");
        setLoading(false);
        return;
      }
      alert("You'r contribution has added 🎉");
      setLoading(false);
    } catch (err) {
      console.log("Errr", err);
    }
  }

  useEffect(() => {
    async function fetchDonators() {
      const r = await getDonators(data.pId);
      console.log("R=>", r);
      setDonators(r);
    }
    fetchDonators();
  }, []);
  return (
    <div
      className={`fixed top-0 right-0 h-full w-full bg-white shadow-lg transform transition-transform duration-[1000000ms] ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full relative"
      }`}
    >
      <button
        className="absolute top-4 right-4 text-xl"
        onClick={toggleSidebar}
      >
        ❌
      </button>
      <div className="flex justify-center items-center h-screen flex-col gap-5">
        <h1 className="text-5xl font-semibold md:w-4/12">
          Donate to {data.title}
        </h1>
        <input
          type="number"
          name="amount"
          onChange={(e) => setAmount(e.target.value)}
          className="border rounded-lg w-3/4 md:w-4/12"
          value={amount}
        />
        <span className="text-xs text-red-600 justify-start">{err}</span>
        {loading == true ? (
          <LoadingSpinner />
        ) : (
          <button
            className="border rounded-lg w-3/4 md:w-4/12 bg-default-green py-1 md:py-3 text-white font-bold"
            onClick={() => handleSubmit(data.pId)}
          >
            Confirm
          </button>
        )}

        {donators.length > 0 ? (
          <>
            <h1 className="text-2xl font-bold">Donators</h1>
            <div className="h-16 overflow-auto">
              {donators.map((donator, i) => (
                <p className="text-xs">
                  {i + 1}: {donator}
                </p>
              ))}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
export default Modal;
