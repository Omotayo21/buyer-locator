import React from 'react';
import Naira1 from '../assets/dollar-sign-covered.jpg';
import Dollar2 from "../assets/Dollar background.jpg";
import Dollar3 from "../assets/dollar bg-2.jpg";
import { useAppSelector } from '../redux/hook';




const Cards = () => {
    const { expenses } = useAppSelector((state) => state.ui);
    const { revenues } = useAppSelector((state) => state.revenue);

   

const totalExpense = expenses.reduce(
  (total: number, expense: any) => total + parseFloat(expense.amount),
  0
);
const totalRevenue = revenues.reduce(
  (total: number, revenue: any) => total + parseFloat(revenue.amount),
  0
);
const totalBalance = totalRevenue + totalExpense;


return (
    <div className="flex lg:flex-row sm:flex-col lg:gap-x-10 sm:gap-y-6  lg:mt-8 sm:ml-6 ">
      <div className=" rounded-md  border-2 text-white lg:w-56 sm:w-[18.9rem]  h-32 relative overflow-hidden ">
        <img
          src={Naira1}
          alt="Background Image"
         
          className=" w-full h-full object-cover opacity-90 "
        />
        <div className="absolute inset-0 text-white text-lg font-bold pl-3">
          <p>Total Revenue</p> <br />
         
          <h1>${totalRevenue}</h1>
        </div>
      </div>
      <div className=" rounded-md  border-2 text-white lg:w-56 sm:w-[18.9rem] h-32 relative overflow-hidden ">
        <img
          src={Dollar2}
          alt="Background Image"
          
          className=" w-full h-full object-cover opacity-80 "
        />
        <div className="absolute inset-0 text-white text-lg pl-3 font-bold">
          <p>Total Expenses</p> <br />
        
          <h1>${totalExpense}</h1>
        </div>
      </div>
      <div className=" rounded-md  border-2 text-white lg:w-56 sm:w-[18.9rem] h-32 relative overflow-hidden ">
        <img
          src={Dollar3}
          alt="Background Image"
          
        
          className=" w-full h-full object-cover opacity-80 "
        />
        <div className="absolute inset-0 text-white text-lg font-bold pl-3">
          <p className='text-sm'>Total revenue + expense</p> <br />
          
          <h1>${totalBalance}</h1>
        </div>
      </div>
    </div>
  );
}

export default Cards