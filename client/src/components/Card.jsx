import { useState } from "react";
import Modal from "./Modal";
function Card({ data }) {
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const [isOpen, setIsOpen] = useState(false);

  function formatDate(date) {
    // Ensure 'date' is a Date object
    const d = new Date(date);

    const formattedDate = `${d.getFullYear()}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
    return formattedDate;
  }
  return (
    <>
      {isOpen && <Modal isOpen={isOpen} setIsOpen={setIsOpen} data={data} />}
      <div className="md:w-80 px-2 py-2 mt-5">
        <img src="sample.jpg" alt="sample.jpg" className="rounded-lg" />
        <h1 className="font-bold my-2">{data.title}</h1>
          <p>Target : {data.target}</p>
          <p>Raised : {data.amountCollected}</p>
        <p>
          Deadline:
          <span className="font-bold">{formatDate(data.deadline)}</span>
        </p>
        <button
          className="bg-default-green text-white font-bold py-2 px-5 w-full mt-3 rounded-md"
          onClick={toggleSidebar}
        >
          Donate Now
        </button>
      </div>
    </>
  );
}
export default Card;
