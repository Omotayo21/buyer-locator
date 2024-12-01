import axios from "axios";
import React, { useState } from "react";
import BaseUrl from "../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import Input from "../components/fetchcomps/CompsInput";
import { CgSpinner, CgSpinnerAlt } from "react-icons/cg";
import "jspdf-autotable";

const FindBuyers = () => {
  const [address, setAddress] = useState("");
  const [buyers, setBuyers] = useState([
   
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch Buyers (Same as before)
  const fetchBuyers = async () => {
    const url = `${BaseUrl}/api/properties`;
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${BaseUrl}/api/comparables`, {
        address,
      });

      const data = response;
      // setBuyers(data);
      // toast.success("Success! Search completed.");
      // console.log(data[0].owner1FirstName);
      // console.log(data[0].owner1LastName);
      console.log(data);
    } catch (err) {
      // toast.error(err?.response?.data?.error || err?.message);
      setLoading(false);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
// Save AS PDF
  const saveAsPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text("Buyer Locator Report", 10, 10);

    // Define table headers and rows
    const tableHeaders = [
      ["Property ID", "Name", "Address", "Sales Price", "Year Built"],
    ];

    const tableRows = buyers.map((buyer) => [
      buyer?.propertyId || "N/A",
      `${buyer?.owner1FirstName || ""} ${buyer?.owner1LastName || ""}`.trim() ||
        "N/A",
      buyer?.address?.address || "N/A",
      buyer?.lastSaleAmount || "N/A",
      buyer?.yearBuilt || "N/L",
    ]);

    // Add table to the document
    doc?.autoTable({
      head: tableHeaders,
      body: tableRows,
      startY: 20, // Position below the title
      styles: {
        fontSize: 10, // Adjust font size
        cellPadding: 4, // Add padding
      },
      headStyles: {
        fillColor: [0, 123, 255], // Blue header background
        textColor: 255, // White header text
        fontStyle: "bold",
      },
    });

    // Save the PDF
    doc.save("buyer-locator-report.pdf");
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
                <CgSpinnerAlt />
              </p>
            ) : (
              "Get Comps"
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
                  12M Purchase
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
                    {`${item?.owner1FirstName || ""}  ${
                      item?.owner1LastName || ""
                    }`}
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
