import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BaseUrl from "../config";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { CgSpinnerAlt } from "react-icons/cg";
import { IoMdArrowBack } from "react-icons/io";

const PropertyCard = () => {
  const location = useLocation();
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [addr, setAddr] = useState(null);
  const [loading, setLoading] = useState(true);
  const address = location.state?.address;

  const saveAsPDF = (property) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Individual Comparable Locator Report", 10, 10);

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
        "Est Value",
      ],
    ];

    const tableRows = [
      [
        property?.id || "N/A",
        `${property?.owner1FirstName || ""} ${property?.owner1LastName || ""}`.trim() || "N/A",
        property?.address?.address || "N/A",
        property?.lotSquareFeet || "N/A",
        property?.squareFeet || "N/A",
        property?.age || "N/A",
        property?.address?.zip || "N/A",
        property?.distance || "N/A",
        property?.yearBuilt || "N/A",
        property?.estimatedValue || "N/A",
      ],
    ];

    doc.autoTable({
      head: tableHeaders,
      body: tableRows,
      startY: 20,
      styles: {
        fontSize: 6,
        cellPadding: 4,
      },
      headStyles: {
        fillColor: [59, 130, 246], // Blue header
        textColor: 255, // White text
        fontStyle: "bold",
      },
    });

    doc.save("individual_comparable_locator_report.pdf");
  };

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      if (!address) {
        toast.error("Address is required to fetch property details.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          `${BaseUrl}/api/comparables/getById`,
          { id, address }
        );
        setProperty(response.data);
      } catch (err) {
        toast.error("Failed to fetch property details. Please try again.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id, address]);

  const navigate = useNavigate();

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <CgSpinnerAlt size={40} color="#3B82F6" />
      </div>
    );

  if (!property) return <p>No property details available for {address}</p>;

  return (
    <div className="w-full h-fit bg-white">
      <div className="max-w-xl mx-auto my-auto shadow-md rounded-lg p-6 border border-gray-200 bg-white">
        <div
          onClick={() => {
            document.documentElement.scrollTop = 0;
            navigate("/locate-buyer/find-comps");
          }}
          className="flex items-center gap-2 cursor-pointer mb-6 text-blue-600">
          <IoMdArrowBack />
          <h3 className="text-blue-600">Go back</h3>
        </div>
        <div className="lg:flex items-start gap-4">
          {/* Image */}
          <div className="w-full lg:w-1/3">
            <img
              loading="lazy"
              src={property?.imageUrl || "https://via.placeholder.com/150"}
              alt="Property"
              className="rounded-lg w-full object-cover"
            />
          </div>
          {/* Address & Info */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900">
              {property?.owner1FirstName || "Unknown Owner"}
            </h2>
            <div className="text-sm text-gray-600 mt-1">
              <p>
                <span className="font-bold">Estimated Value:</span> $
                {`${Number(property?.estimatedValue).toLocaleString()}` || "N/A"}
              </p>
              <p>
                <span className="font-bold">Status:</span> {property?.status || "N/A"}
              </p>
              <p>
                <span className="font-bold">Distressed:</span> {property?.distressed ? "Yes" : "No"}
              </p>
              <p>
                <span className="font-bold">Liens:</span> ${property?.liens || "N/A"}
              </p>
            </div>
            <div className="mt-2 flex gap-2">
              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
                {property?.ownerType || "N/A"}
              </span>
              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
                {property?.occupancyStatus || "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-4 text-center gap-4 mt-4">
          <div>
            <p className="text-lg font-bold text-gray-900">
              {property?.bedrooms || "N/A"}
            </p>
            <p className="text-sm text-gray-600">Beds</p>
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">
              {property?.bathrooms || "N/A"}
            </p>
            <p className="text-sm text-gray-600">Baths</p>
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">
              {property?.squareFeet || "N/A"}
            </p>
            <p className="text-sm text-gray-600">SqFt</p>
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">
              {property?.yearBuilt || "N/A"}
            </p>
            <p className="text-sm text-gray-600">Yr. Built</p>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="flex justify-between items-center mt-6">
          <div className="text-center">
            <p className="text-lg font-bold text-green-600">
              {`$${Number(property?.estimatedEquity).toLocaleString()}`}
            </p>
            <p className="text-sm text-gray-600">Est. Equity</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-green-600">
              ${property?.avgComps || "N/A"}
            </p>
            <p className="text-sm text-gray-600">Avg. Comps</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-green-600">
              ${property?.estimatedRent || "N/A"}
            </p>
            <p className="text-sm text-gray-600">Est. Rent</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => saveAsPDF(property)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Save To PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
