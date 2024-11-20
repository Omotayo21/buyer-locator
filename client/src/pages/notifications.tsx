
import React, {useEffect} from "react";
import { BellRinging, Bell } from "phosphor-react";
import { useAppSelector, useAppDispatch } from "../redux/hook";
import { fetchExpenses, fetchRevenues } from "../utils/fetchData";
const Notifications = () => {
  const {  expenses } = useAppSelector((state) => state.ui);
  const { revenues } = useAppSelector((state) => state.revenue);

  const today = new Date().toLocaleDateString();
   const dispatch = useAppDispatch();

   useEffect(() => {
     fetchExpenses(dispatch);
     fetchRevenues(dispatch);
   }, [dispatch]);
  return (
    <>
      <div className={`min-h-screen flex flex-row mt-12 `}>
        <div className="max-w-2xl mx-auto mt-8 p-8 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-bold mb-6 text-black flex flex-row">
            All Notifications <Bell size={20} className="mt-2 ml-2" />
          </h1>

          {expenses.length === 0 && revenues.length === 0 ? (
            <p>No notifications yet</p>
          ) : (
            <ul className="flex flex-col gap-y-4">
              {expenses.map((expense: any, index: any) => (
                <li
                  key={index}
                  className="flex items-start justify-between border-2 lg:w-[36rem] sm:w-[16rem] rounded-md bg-gray-200 border-blue mt-2 pb-4 flex-row pt-4"
                >
                  <BellRinging
                    size={30}
                    className="text-black lg:ml-2 sm:mr-1 sm:p-1"
                  />
                  <div className="">
                    <p className="lg:text-sm sm:text-[0.6rem] text-black">
                      You added {expense.name} to your expenses list which cost
                      you ${expense.amount}
                    </p>
                  </div>
                  <span className=" bg-blue-700 text-white lg:text-[0.7rem] sm:text-[0.6rem] lg:p-2 sm:p-1 mr-2 rounded-md">
                    {today}
                  </span>
                </li>
              ))}
              {revenues.map((revenue: any, index: any) => (
                <li
                  key={index}
                  className="flex items-start justify-between border-2 lg:w-[36rem] sm:w-[16rem] rounded-md bg-gray-200 border-blue mt-2 pb-4 flex-row pt-4"
                >
                  <BellRinging
                    size={30}
                    className="text-black lg:ml-2 sm:mr-1 sm:p-1"
                  />
                  <div className="">
                    <p className="lg:text-sm sm:text-[0.6rem] text-black">
                      You received revenue of ${revenue.amount} from{" "}
                      {revenue.name}
                    </p>
                  </div>
                  <span className=" bg-blue-700 text-white lg:text-[0.7rem] sm:text-[0.4rem] lg:p-2 sm:p-1 mr-2 rounded-md">
                    {today}
                  </span>
                </li>
              ))}
              {/*budgets.map((budget, index) => (
                <li
                  key={index}
                  className="flex items-start justify-between border-2 lg:w-[36rem] sm:w-[16rem] rounded-md bg-gray-200 border-blue mt-2 pb-4 flex-row pt-4"
                >
                  <BellRinging
                    size={30}
                    className="text-black lg:ml-2 sm:mr-1 sm:p-1"
                  />
                  <div className="">
                    <p className="text-sm text-black">
                      You set a budget for {budget.category} at {" "}
                      ${budget.amount}
                    </p>
                  </div>
                  <span className=" bg-blue-700 text-white lg:text-sm sm:text-[0.6rem] lg:p-2 sm:p-1 mr-2 rounded-md">
                    {today}
                  </span>
                </li>
              )*/}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Notifications;
