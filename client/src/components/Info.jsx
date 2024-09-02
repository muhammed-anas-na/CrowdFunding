import React from "react";

function Info() {
  return (
    <div className="">
      <h1 className=" text-xl md:text-5xl font-bold">Fund,Fast as Flash</h1>
      <p className="text-xs md:text-sm text-gray-500">
        Fundrise at the speed of thought! Elevate your cause in just a minute
        with our
        <span className="text-sky-600"> decentralized </span>
        fundraising platform
      </p>

      <div className="flex flex-col md:flex-row mt-10 gap-5">
      <div className="flex flex-col border border-gray-300 bg-slate-50 rounded-lg px-5 py-14">
            <h2 className="font-semibold text-2xl">Ignite impact</h2>
            <p className="text-gray-400 mt-4">Spark by sharing your cause and the positive impact it brings. Clearly express how contribution will make a meaningful difference.</p>
        </div>

        <div className="flex flex-col border border-gray-300 bg-slate-50 rounded-lg px-5 py-14">
            <h2 className="font-semibold text-2xl">Spread the word</h2>
            <p className="text-gray-400 mt-4">Leverage the speed of social media and online network. Share your fundraising campaigns swiftly across varies platforms.</p>
        </div>
        <div className="flex flex-col border border-gray-300 bg-slate-50 rounded-lg px-5 py-14">
            <h2 className="font-semibold text-2xl">Connect Globally</h2>
            <p className="text-gray-400 mt-4">Build a strong socail network around your cause. Encourage supporters to share the campaign within their local communities.</p>
        </div>

      </div>
    </div>
  );
}

export default Info;
