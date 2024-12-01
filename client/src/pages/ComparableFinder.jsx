import axios from "axios";
import React, { useState } from "react";
import BaseUrl from "../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import Input from "../components/Input";
import { CgSpinnerAlt } from "react-icons/cg";
import "jspdf-autotable";

const ComparableFinder = () => {
  const [address, setAddress] = useState("");
  const [comparables, setComparable] = useState([] | "");
  const [loading, setLoading] = useState(false);

  // Fetch COmparables
  const fetchComparables = async () => {
    const url = `${BaseUrl}/api/properties`;
    try {
      setLoading(true);
      const response = await axios.post(`${BaseUrl}/api/comparables`, {
        address,
      });

      const data = response;
      if (
        Array.isArray(data.data) &&
        data.data.every((item) => typeof item === "object")
      ) {
        setComparable(data.data);
      } else {
        toast.error(data.data.message);
      }
      setAddress("");
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
    doc.text("Comparable Locator Report", 10, 10);

    // Define table headers and rows
    const tableHeaders = [
      [
        "ID",
        "Name",
        "Address",
        "Lot SQFT",
        "Property SQFT",
        "Age",
        "Zip Code",
        "Distance From Property",
        "Year Built",
      ],
    ];

    const tableRows = comparables.map((comparable) => [
      comparable?.id || "N/A",
      `${comparable?.owner1FirstName || ""} ${
        comparable?.owner1LastName || ""
      }`.trim() || "N/A",
      comparable?.address?.address || "N/A",
      comparable?.lotSquareFeet || "N/A",
      comparable?.squareFeet || "N/L",
      comparable?.age || "N/L",
      comparable?.address?.zip || "N/L",
      comparable?.distance || "N/L",
      comparable?.yearBuilt || "N/L",
    ]);

    // Add table to the document
    doc?.autoTable({
      head: tableHeaders,
      body: tableRows,
      startY: 20, // Position below the title
      styles: {
        fontSize: 6, // Adjust font size
        cellPadding: 4, // Add padding
      },
      headStyles: {
        fillColor: [0, 123, 255], // Blue header background
        textColor: 255, // White header text
        fontStyle: "bold",
      },
    });

    // Save the PDF
    doc.save("comparable-locator-report.pdf");
  };
  const disabled = !Array.isArray(comparables);
  return (
    <div className="lg:border mt-4  lg:border-gray-300 mx-auto  lg:p-0 max-w-xl h-4/5">
      <div className="w-full h-full ">
        <div className="flex w-ful h-fit gap-4 ">
          <Input setAddress={setAddress} address={address} />
          <button
            disabled={address.length <= 0}
            onClick={fetchComparables}
            className="bg-[#4608AD] disabled:bg-[#4708ad33] disabled:cursor-not-allowed text-white w-[70px] flex justify-center items-center  h-[50px] rounded-md text-sm">
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
                  SqFt of the Property
                </th>
              </tr>
            </thead>
            <tbody>
              {comparables.length > 0 &&
                comparables.map((item) => (
                  <tr
                    key={item.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="py-4 px-6">{item?.id}</td>
                    <td className="py-4 px-6">
                      {`${item?.owner1FirstName || ""}  ${
                        item?.owner1LastName || ""
                      }`}
                    </td>
                    <td className="py-4 px-6">{item.squareFeet}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <abbr title="Make sure the table contains at least one COMPARABLE before Saving As PDF ">
        <button
          disabled={disabled}
          onClick={saveAsPDF}
          className="bg-[#2196f3] disabled:cursor-not-allowed disabled:bg-[#2195f35e] text-white mt-4 p-2">
          Save as PDF
        </button>
      </abbr>

      {/* {loading && <p>Loading...</p>} */}
      {/* {error && <p style={{ color: "red" }}>Error: {error}</p>} */}
    </div>
  );
};

export default ComparableFinder;
