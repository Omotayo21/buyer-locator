const getPropertyDetails = async (req, res) => {
  try {
    const { address } = req.body; // User inputs the address
    const propertyDetails = await realEstateService.fetchPropertyDetails(
      address
    );

    // Log linked properties for debugging
    propertyDetails.buyers.forEach((buyer) => {
      console.log("Buyer linked properties:", buyer.linkedProperties);
    });

    res.status(200).json(propertyDetails.buyers); // Send filtered results to the frontend
  } catch (error) {
    console.error("Error fetching property details:", error.message);
    res.status(500).json({ error: "Failed to fetch property details" });
  }
};

module.exports = { getPropertyDetails };
