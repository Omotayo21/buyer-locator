import React, { useState } from "react";
import axios from "axios";
import BaseUrl from "../config";

function ComparableFinder() {
  const [address, setAddress] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.post(`${BaseUrl}/api/comparables`, { address:"lake" });
      // setResults(response.data);
      console.log(response)
    } catch (error) {
      console.error("Error fetching comparables:", error);
    }
  };

  return (
    <div className="comparable-finder p-4 bg-white rounded shadow-md">
      <input
        type="text"
        placeholder="Enter Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="address-input w-full p-2 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
      />
      <button
        onClick={handleSearch}
        className="search-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Search
      </button>
      <div className="results mt-4">
        {results.length > 0 ? (
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="py-3 px-6">Address</th>
                <th className="py-3 px-6">Bedrooms</th>
                <th className="py-3 px-6">Bathrooms</th>
                <th className="py-3 px-6">Year Built</th>
                <th className="py-3 px-6">Adjusted Value</th>
              </tr>
            </thead>
            <tbody>
              {results.map((comp) => (
                <tr key={comp.id} className="bg-white border-b">
                  <td className="py-4 px-6">{comp.address.address}</td>
                  <td className="py-4 px-6">{comp.bedrooms}</td>
                  <td className="py-4 px-6">{comp.bathrooms}</td>
                  <td className="py-4 px-6">{comp?.yearBuilt}</td>
                  <td className="py-4 px-6">
                    ${comp.adjustedValue.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ): <p>No results found</p>}
      </div>
    </div>
  );
}

export default ComparableFinder;