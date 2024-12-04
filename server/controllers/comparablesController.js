const realEstateAPIService = require("../services/realEstateAPIService");
const { subYears, isAfter, parseISO } = require("date-fns");

const adjustComparable = (subject, comp) => {
  let adjustedValue = parseFloat(comp.estimatedValue || 0);

  // Handle missing data with default values
  const subjectBedrooms = parseInt(subject.bedrooms) || 0;
  const compBedrooms = parseInt(comp.bedrooms) || 0;

  const subjectBathrooms = parseInt(subject.bathrooms) || 0;
  const compBathrooms = parseInt(comp.bathrooms) || 0;

  const subjectPoolAvailable = subject.poolAvailable || false;
  const compPoolAvailable = comp.poolAvailable || false;

  const subjectGarageAvailable = subject.garageAvailable || false;
  const compGarageAvailable = comp.garageAvailable || false;

  const subjectCarportAvailable = subject.carportAvailable || false;
  const compCarportAvailable = comp.carportAvailable || false;

  // Adjusted for bedrooms
  if (subjectBedrooms !== compBedrooms) {
    adjustedValue += (subjectBedrooms - compBedrooms) * 15000; // Example adjustment
  }

  // Adjusted for bathrooms
  if (subjectBathrooms !== compBathrooms) {
    adjustedValue += (subjectBathrooms - compBathrooms) * 10000;
  }

  // Adjusted for pools if pools are available
  if (subjectPoolAvailable !== compPoolAvailable) {
    adjustedValue += subjectPoolAvailable ? 10000 : -10000;
  }

  // Adjust for garages if available
  if (subjectGarageAvailable !== compGarageAvailable) {
    adjustedValue += subjectGarageAvailable ? 10000 : -10000;
  }

  // Adjust for carports if available
  if (subjectCarportAvailable !== compCarportAvailable) {
    adjustedValue += subjectCarportAvailable ? 5000 : -5000;
  }

  comp.adjustedValue = adjustedValue;
  return comp;
};
exports.getComparables = async (req, res) => {
  try {
    const { address, criteria } = req.body;

    const data = await realEstateAPIService.fetchPropertyComparables(address);
    const subject = data.subject;
    const comps = data.comps;
    //console.log("Subject:", data.subject);
    // console.log("Comparables:", data.comps);

    // Applying of appraisal rules and adjustments
    const twelveMonthsAgo = subYears(new Date(), 1);
 
 const filteredComps = comps
   .filter((comp) => {
     let isMatch = true;

     if (criteria?.propertyType) {
       isMatch = isMatch && comp.propertyType === subject.propertyType;
     }

     if (criteria?.squareFeet) {
       isMatch =
         isMatch &&
         Math.abs((comp.squareFeet || 0) - (subject.squareFeet || 0)) <= 250;
     }

     if (criteria?.yearBuilt) {
       isMatch =
         isMatch &&
         Math.abs((comp.yearBuilt || 0) - (subject.yearBuilt || 0)) <= 10;
     }

     if (criteria?.lotSquareFeet) {
       isMatch =
         isMatch &&
         Math.abs((comp.lotSquareFeet || 0) - (subject.lotSquareFeet || 0)) <=
           2500;
     }

     if (criteria?.lastSaleDate) {
       isMatch =
         isMatch &&
         (comp.lastSaleDate
           ? isAfter(parseISO(comp.lastSaleDate), twelveMonthsAgo)
           : false);
     }

     return isMatch;
   })
   .map((comp) => adjustComparable(subject, comp));

 if (filteredComps.length === 0) {
   res.status(200).json({ message: "No comparables found matching criteria." });
   return;
 }
    const topComparables = filteredComps
      .sort((a, b) => b.adjustedValue - a.adjustedValue)
      .slice(0, 10);

    res.status(200).json(topComparables);
  } catch (error) {
    console.log(error);
  }
};
exports.getComparableById = async (req, res) => {
  try {
    const { id, address } = req.body; // Get both id and address from the body

   // console.log("ID from body:", id);
   // console.log("Address from body:", address);

    // Fetch comparables based on the address
    const data = await realEstateAPIService.fetchPropertyComparables(address);

   // console.log("Fetched comparables data:", data);

    if (!data || !data.comps) {
      return res
        .status(500)
        .json({ message: "Failed to fetch comparables data." });
    }

    // Find the specific comp by ID
    const comparable = data.comps.find(
      (comp) => String(comp.id) === String(id)
    );
    console.log("Found comparable:", comparable);

    if (!comparable) {
      return res.status(404).json({ message: "Comparable not found." });
    }

    res.status(200).json(comparable);
  } catch (error) {
    console.error("Error fetching comparable:", error.message);
    res.status(500).json({ message: "Failed to fetch comparable." });
  }
};
