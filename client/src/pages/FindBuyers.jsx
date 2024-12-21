import axios from "axios";
import React, { useState } from "react";
import BaseUrl from "../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import Input from "../components/Input";
import { CgSpinnerAlt } from "react-icons/cg";
import "jspdf-autotable";

const FindBuyers = () => {
  const [address, setAddress] = useState("");
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Buyers (Same as before)
  const fetchBuyers = async () => {
    const url = `${BaseUrl}/api/properties`;
    try {
      setLoading(true);
      const response = await axios.post(`${url}`, {
        address,
      });

      const data = response.data.data;
      setBuyers(data);
      toast.success("Success! Search completed.");
    } catch (err) {
      toast.error(err?.response?.data?.error || err?.message);
      setLoading(false);
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
    <div className="lg:border mt-4 lg:border-gray-300 mx-auto lg:p-0 max-w-xl h-4/5">
  <div className="w-full h-full">
    <div className="flex w-full h-fit gap-4">
      <Input setAddress={setAddress} address={address} />
      <button
        disabled={address.length <= 0 || loading}
        onClick={fetchBuyers}
        className="bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white w-[70px] flex justify-center items-center h-[50px] rounded-md text-sm">
        {loading ? (
          <p className="animate-spin">
            <CgSpinnerAlt />
          </p>
        ) : (
          "Get Buyers"
        )}
      </button>
    </div>
    <div className="overflow-y-auto h-96">
      <table className="table-auto w-full text-left text-sm text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="py-3 px-6">ID</th>
            <th scope="col" className="py-3 px-6">Name</th>
            <th scope="col" className="py-3 px-6">12M Purchase</th>
          </tr>
        </thead>
        <tbody>
          {buyers.map((item) => (
            <tr key={item.id} className="bg-white border-b">
              <td className="py-4 px-6">{item.propertyId}</td>
              <td className="py-4 px-6">
                {`${item?.owner1FirstName || ""} ${item?.owner1LastName || ""}`}
              </td>
              <td className="py-4 px-6">{item.portfolioPurchasedLast12Months}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  <abbr title="Make sure the table contains at least one buyer before Saving As PDF">
    <button
      disabled={buyers.length <= 0}
      onClick={saveAsPDF}
      className="bg-blue-500 disabled:bg-gray-300 text-white mt-4 p-2">
      Save as PDF
    </button>
  </abbr>
</div>

  );
};

export default FindBuyers;
