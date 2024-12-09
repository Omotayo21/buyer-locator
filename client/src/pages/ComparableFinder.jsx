import React, { useState } from "react";
import { calculateArvPercent, formatNumber, saveAsPDF } from "../utils";
import { toast } from "react-toastify";
import { CgSpinnerAlt } from "react-icons/cg";
import PropertyCard from "./PropertyCard";
import { Link, useParams } from "react-router-dom";
import Input from "../components/Input";
import axios from "axios";
import BaseUrl from "../config";

const ComparableFinder = ({ comparables, setComparable, setDetail }) => {
  const [acquisitionPrice, setAcquisitionPrice] = useState(
    localStorage.getItem("acqPrice") || ""
  );
  const [arvPercentage, setArvPercentage] = useState(
    localStorage.getItem("arvPer") || ""
  );
  const [address, setAddress] = useState(localStorage.getItem("address") || "");
  const [loading, setLoading] = useState(false);
  const [criteria, setCriteria] = useState({
    propertyType: false,
    squareFeet: false,
    yearBuilt: false,
    lotSquareFeet: false,
    lastSaleDate: false,
    withinHalfMile: false,
  });

  const criteriaLabels = {
    propertyType: "Property of thesame Type",
    squareFeet: "Within 250 sqft of the subject property",
    yearBuilt: "1-year comp sale",
    lotSquareFeet: "Lot Square Feet",
    lastSaleDate: "Sold within the last 10 years",
    withinHalfMile: "Property within Half Mile",
  };

  const { id } = useParams();

  const fetchComparables = async () => {
    // setLoading(true)
    try {
      setLoading(true);
      const response = await axios.post(`${BaseUrl}/api/comparables`, {
        address,
        criteria,
      });

      const data = response.data;
      if (
        Array.isArray(data) &&
        data.every((item) => typeof item === "object")
      ) {
        setComparable(data);
        localStorage.setItem("address", address);
        localStorage.setItem("acqPrice", acquisitionPrice);
        localStorage.setItem("arvPer", arvPercentage);
        toast.success("Comparables Fetched Successfully");
      } else {
        toast.error(data.message || "Invalid data received.");
        setComparable([]);
      }
    } catch (err) {
      toast.error(err?.response?.data?.error || err?.message);
      console.log("first");
      setLoading(false);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (key) => {
    setCriteria((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, ""); // Remove existing commas
    if (!isNaN(rawValue)) {
      setAcquisitionPrice(formatNumber(rawValue));
      localStorage.setItem("acqPrice", e.target.value);
    }
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
              disabled={!address || !acquisitionPrice || !arvPercentage}
              onClick={() => fetchComparables()}
              className="bg-[#4608AD] disabled:bg-[#4708ad33] disabled:cursor-not-allowed text-white w-[70px] flex justify-center items-center h-[50px] rounded-md text-sm">
              {loading ? (
                <CgSpinnerAlt className="animate-spin" />
              ) : (
                "Get Comps"
              )}
            </button>
          </div>
          <div className="flex gap-4 mt-4">
            <input
              type="text"
              placeholder="Enter Acquisition Price"
              value={acquisitionPrice}
              className="border p-2 rounded w-full"
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-4 mt-4">
            <input
              type="number"
              placeholder="Enter ARV%"
              value={arvPercentage}
              onChange={(e) => {
                setArvPercentage(e.target.value);
                localStorage.setItem("arvPer", e.target.value);
              }}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="flex gap-4 mt-4 flex-wrap">
            {Object.keys(criteria).map((key) => (
              <label key={key} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={criteria[key]}
                  onChange={() =>
                    setCriteria((prev) => ({
                      ...prev,
                      [key]: !prev[key],
                    }))
                  }
                  className="w-4 h-4"
                />
                <span className="text-sm">{criteriaLabels[key]}</span>
              </label>
            ))}
          </div>
          <div className="overflow-y-auto h-96 mt-4">
            <table className="table-auto w-full text-left text-sm text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="py-3 px-6">ID</th>
                  <th className="py-3 px-6">Name</th>
                  <th className="py-3 px-6">Address</th>
                  <th className="py-3 px-6">Sold Price</th>
                  <th className="py-3 px-6">ARV%</th>
                </tr>
              </thead>
              <tbody>
                {comparables?.length > 0 &&
                  comparables.map((comp) => {
                    const arvPercent = calculateArvPercent(
                      comp,
                      acquisitionPrice
                    );

                    return (
                      <tr key={comp.id} className="bg-white border-b">
                        <td className="py-4 px-6">{comp.id}</td>
                        <td className="py-4 px-6">
                          {`${comp?.owner1FirstName || ""} ${
                            comp?.owner1LastName || ""
                          }`}
                        </td>
                        <td
                          onClick={() =>
                            (document.documentElement.scrollTop = 0)
                          }
                          className="py-4 px-6">
                          <Link
                            state={{ address }}
                            to={`/locate-buyer/find-comps/details/${comp.id}`}
                            className="text-blue-500 underline">
                            {comp.address?.address}
                          </Link>
                        </td>
                        <td className="py-4 px-6">
                          ${Number(comp?.lastSaleAmount).toLocaleString()}
                        </td>
                        <td
                          className={`py-4 px-6 ${
                            arvPercent >= Number(arvPercentage)
                              ? "text-green-600"
                              : "text-red-600"
                          }`}>
                          {arvPercent?.toLocaleString()}%
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <button
            disabled={comparables?.length === 0}
            onClick={() => saveAsPDF(comparables)}
            className="bg-[#2196f3] disabled:bg-[#2195f35e] text-white mt-4 p-2">
            Save as PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default ComparableFinder;
