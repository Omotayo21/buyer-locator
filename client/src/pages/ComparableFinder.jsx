import axios from "axios";
import React, { useState } from "react";
import BaseUrl from "../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import Input from "../components/Input";
import { CgSpinnerAlt } from "react-icons/cg";
import "jspdf-autotable";
import PropertyCard from "./PropertyCard";
import { Link } from "react-router-dom";
import { useLocation ,useParams} from "react-router-dom";

const ComparableFinder = ({
  comparables,
  setComparable,
  setDetail,
  detail,
}) => {
  const [arvPercentage, setArvPercentage] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [criteria, setCriteria] = useState({
    "Show Sold Price": false,
    "Show Year Built": false,
    "Highlight Over ARV%": false,
    withinHalfMile: false,
    "Show Lot Square Feet": false,
  });
const {id}=useParams()
  // Fetch COmparables
  const fetchComparables = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${BaseUrl}/api/comparables`, {
        address,
        criteria,
      });

      const data = response;
      console.log(arvPercentage);
      if (
        Array.isArray(data.data) &&
        data.data.every((item) => typeof item === "object")
      ) {
        setComparable(data?.data);
        // setComparable(data.data);
        console.log(comparables);
        console.log(data.data);
        // calculateArvPercent()
        localStorage.setItem("address", address);
        console.log(address);
        // setAddress("");
      } else {
        toast.error(data.data.message);
      }
      // setAddress("");
    } catch (err) {
      toast.error(err?.response?.data?.error || err?.message);
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
  const handleCheckboxChange = (key) => {
    setCriteria((prev) => ({ ...prev, [key]: !prev[key] }));
    console.log(criteria);
  };

  const disabled = !Array.isArray(comparables);
  const calculateArvPercent = (comp) => {
    // Parse the lastSaleAmount and arvPercent to numbers
    const lastSaleAmount = parseFloat(comp?.lastSaleAmount);
    const arvPercent = parseFloat(arvPercentage);

    // Handle invalid values (e.g., non-numeric or zero)
    if (!arvPercent || !lastSaleAmount || lastSaleAmount === 0) {
      return 0; // Return 0 if calculation is not possible
    }

    // Calculate the ARV percentage
    const percent = ((arvPercentage / lastSaleAmount) * 100).toFixed(3);
    return parseFloat(percent); // Return as a number
  };
  return (
    <div className="lg:border mt-4 lg:border-gray-300 mx-auto lg:p-0 max-w-xl h-4/5">
      {id ? (
        <PropertyCard />
      ) : (
        <div className="w-full h-full">
          <div className="flex w-ful h-fit gap-4">
            <Input
              setComparable={setComparable}
              setAddress={setAddress}
              address={address}
            />
            <button
              disabled={!address || !arvPercentage}
              onClick={fetchComparables}
              className="bg-[#4608AD] disabled:bg-[#4708ad33] disabled:cursor-not-allowed text-white w-[70px] flex justify-center items-center h-[50px] rounded-md text-sm">
              {loading ? (
                <p className="animate-spin">
                  <CgSpinnerAlt />
                </p>
              ) : (
                "Get Comps"
              )}
            </button>
          </div>
          <div className="flex gap-4 mt-4">
            <input
              type="number"
              placeholder="Enter ARV% "
              value={arvPercentage}
              onChange={(e) => setArvPercentage(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
          {/* // Checkboxes for Criteria */}
          <div className="flex gap-4 mt-4 flex-wrap">
            {Object.keys(criteria).map((key) => (
              <label key={key} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={criteria[key]}
                  onChange={() => handleCheckboxChange(key)}
                  className="w-4 h-4"
                />
                <span className="text-sm">{key}</span>
              </label>
            ))}
          </div>
          {/* Comparables Table */}
          <div className="overflow-y-auto h-96 mt-4">
            <table className="table-auto w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="py-3 px-6">ID</th>
                  <th className="py-3 px-6">Name</th>
                  <th className="py-3 px-6">Address</th>
                  <th className="py-3 px-6">ARV%</th>
                </tr>
              </thead>
              <tbody>
                {comparables?.length > 0 &&
                  comparables.map((comp) => {
                    const arvPercent = calculateArvPercent(comp); // Call the updated function
                    setDetail(comp);

                    return (
                      <tr
                        key={comp.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="py-4 px-6">{comp.id}</td>
                        <td className="py-4 px-6">
                          {`${comp?.owner1FirstName || ""} ${
                            comp?.owner1LastName || ""
                          }`}
                        </td>
                        <td className="py-4 px-6">
                          <Link
                            onClick={() => setComparable([])}
                            state={{ address: address }}
                            to={`/locate-buyer/find-comps/details/${detail.id}`}
                            className="text-blue-500 underline">
                            {comp.address?.address}
                          </Link>
                        </td>
                        <td
                          className={`py-4 px-6 ${
                            arvPercent >= arvPercentage
                              ? "text-green-600"
                              : "text-red-600"
                          }`}>
                          {arvPercent}%
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <button
            disabled={comparables?.length === 0}
            onClick={saveAsPDF}
            className="bg-[#2196f3] disabled:cursor-not-allowed disabled:bg-[#2195f35e] text-white mt-4 p-2">
            Save as PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default ComparableFinder;
