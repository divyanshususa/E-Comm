import React from "react";

const RewardCard = () => {
  return (
    <div className="border-1 border-gray-300 rounded-xl flex items-center flex-col p-3 ">
      <div className="h-20 w-20 ">
        <img
          src="https://www.pngitem.com/pimgs/m/283-2839381_rewards-png-free-download-reward-image-png-transparent.png"
          alt=""
        />
      </div>
      <p className="text-3xl capitalize font-sans font-normal ">reward title</p>
      <p className="text-2xl capitalize font-sans font-bold ">reward amount</p>
      <p className="text-2xl capitalize font-sans">obtained date</p>
    </div>
  );
};

export default RewardCard;
