import React from "react";
import { LocationOnIcon } from "../static/icons";

const OrderCard = () => {
  return (
    <div className="border-1 flex flex-col justify-between rounded-xl border-blue-400 p-2">
      <div className="flex justify-between text-2xl  p-2 tracking-normal">
        <div>
          <p className="font-bold capitalize">
            order id :<span>8924</span> <span>status</span>
          </p>
          <p className="text-gray-400 font-semibold capitalize">
            date : <span>19-03-24</span>{" "}
          </p>
        </div>

        <div className="flex items-start gap-2">
          <button className="capitalize p-1 bg-red-100 border-1 border-red-400 text-red-500 rounded-lg">
            cancel order
          </button>
          <button className="capitalize p-1 bg-blue-500 border-1 border-blue-400  text-white rounded-lg">
            track order
          </button>
        </div>
      </div>
      <hr />
      <div className="p-2 grid sm:grid-cols-3 ">
        <div className="text-2xl capitalize">
          <p className=" text-gray-400">Contact</p>
          <p className="">
            Name : <span>Mike</span>
          </p>
          <p>
            phone : <span>9876543210</span>
          </p>
          <p>
            email : <span>mike@gmail.com</span>
          </p>
        </div>
        <div className="text-2xl capitalize">
          <p className=" text-gray-400">shipping address</p>
          <p>
            <span className="text-gray-400 text-3xl">
              <LocationOnIcon />{" "}
            </span>
            address
          </p>
        </div>
        <div className="text-2xl capitalize">
          <p className=" text-gray-400">payment</p>
          <p>
            shipping fee: <span>87</span>
          </p>
          <p>
            total fee: <span>87</span>
          </p>
        </div>
      </div>
      <hr />
      <div className="grid grid-cols-3 gap-2 p-2">
        <div className="border-1 border-gray-300 p-2 flex items-center flex-col w-64 rounded-lg gap-2 justify-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCxegEfCsW7wUSxa6ZjB-7jPOqgJ1_lvema6prADd2eQ&s"
            className="h-28 w-28 object-cover rounded-full"
            alt=""
          />
          <p className="text-2xl">product title</p>
        </div>
        <div className="border-1 border-gray-300 p-2 flex items-center flex-col w-64 rounded-lg gap-2 justify-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCxegEfCsW7wUSxa6ZjB-7jPOqgJ1_lvema6prADd2eQ&s"
            className="h-28 w-28 object-cover rounded-full"
            alt=""
          />
          <p className="text-2xl">product title</p>
        </div>
        <div className="border-1 border-gray-300 p-2 flex items-center flex-col w-64 rounded-lg gap-2 justify-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCxegEfCsW7wUSxa6ZjB-7jPOqgJ1_lvema6prADd2eQ&s"
            className="h-28 w-28 object-cover rounded-full"
            alt=""
          />
          <p className="text-2xl">product title</p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
