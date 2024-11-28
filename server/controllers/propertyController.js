const realEstateAPIService = require("../services/realEstateAPIService");
const getPropertyDetails = async (req, res) => {
  try {
    const { address } = req.body; 
     const encodedAddress = encodeURIComponent(address);
     const propertyDetails = await realEstateAPIService.fetchPropertyDetails({
       
       address: {
         address: encodedAddress,
       },
     });
   

console.log(propertyDetails);
  
  } catch (error) {
    console.error("Error fetching property details:", error.message);
    res.status(500).json({ error: "Failed to fetch property details" });
  }
};

module.exports = { getPropertyDetails };
