import axios from "axios";
import React, { useState } from "react";
import BaseUrl from "../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import { Link, Outlet } from "react-router-dom";
import Input from "../components/Input";
const FindBuyers = () => {
  const [address, setAddress] = useState("");
  const [buyers, setBuyers] = useState([
    // { name: "PEter", property: "20", id: "1" },
    // { name: "PEter", property: "20", id: "1" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch Buyers (Same as before)
  const fetchBuyers = async () => {
    const url = `${BaseUrl}/api/properties`;
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${BaseUrl}/api/properties`, {
        address,
      });

      const data = response.data.data;
      toast.success("Success! Search completed.");
      setBuyers(data);
      console.log(data);
    } catch (err) {
      //   toast.error(err.message, {
      //     position: toast.POSITION.TOP_RIGHT,
      //   });
      toast.error(err.response.data.error);

      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Save as PDF
  const saveAsPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("Buyer Locator Report", 10, 10);

    buyers.forEach((buyer, index) => {
      const yPosition = 20 + index * 10; // Dynamically position each buyer's info
      doc.text(
        `ID: ${buyer.propertyId}, Name: ${
          buyer.owner1FirstName + buyer.owner1LastName
        },  Address: ${buyer.address}`,
        10,
        yPosition
      );
    });

    doc.save("buyers.pdf");
  };

  return (
    <div className="lg:border mt-4  lg:border-gray-300 mx-auto  lg:p-0 max-w-xl h-4/5">
      <div className="w-full h-full ">
        <div className="flex w-ful h-fit gap-4 ">
          <Input setAddress={setAddress} address={address} />
          <button
            onClick={fetchBuyers}
            className="bg-[#4608AD] text-white w-[70px] flex justify-center items-center  h-[50px] rounded-md text-sm">
            {loading ? (
              <p className="animate-spin">
                <CgSpinner />
              </p>
            ) : (
              "Get Buyers"
            )}
          </button>
        </div>
        <div className="overflow-y-auto h-96">
          <table className="table-auto w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  ID
                </th>
                <th scope="col" className="py-3 px-6">
                  Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Property
                </th>
              </tr>
            </thead>
            <tbody>
              {buyers.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="py-4 px-6">{item.propertyId}</td>
                  <td className="py-4 px-6">
                    {item.owner1FirstName + item.owner1LastName}
                  </td>
                  <td className="py-4 px-6">
                    {item.portfolioPurchasedLast12Months}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button onClick={saveAsPDF} className="bg-[#2196f3] text-white mt-4 p-2">
        Save as PDF
      </button>

      {/* {loading && <p>Loading...</p>} */}
      {/* {error && <p style={{ color: "red" }}>Error: {error}</p>} */}
    </div>
  );
};

export default FindBuyers;
