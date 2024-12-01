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
    const { address } = req.body;

    const data = await realEstateAPIService.fetchPropertyComparables(address);
    const subject = data.subject;
    const comps = data.comps;
    //console.log("Subject:", data.subject);
    // console.log("Comparables:", data.comps);

    // Applying of appraisal rules and adjustments
    const twelveMonthsAgo = subYears(new Date(), 1);
    const filteredComps = comps
      .filter((comp) => {
        const isSameType = comp.propertyType === subject.propertyType;
        console.log("Property Type Match:", isSameType);
        const within250SqFt =
          Math.abs((comp.squareFeet || 0) - (subject.squareFeet || 0)) <= 250;
        console.log("Square Feet Within 250:", within250SqFt);
        const within10Years =
          Math.abs((comp.yearBuilt || 0) - (subject.yearBuilt || 0)) <= 10;
        console.log("Year Built Within 10 Years:", within10Years);
        const withinLotSize =
          Math.abs((comp.lotSquareFeet || 0) - (subject.lotSquareFeet || 0)) <=
          2500;
        console.log("Lot Size Within 2500:", withinLotSize);
        const lastSaleDateValid = comp.lastSaleDate
          ? isAfter(parseISO(comp.lastSaleDate), twelveMonthsAgo)
          : false;
        console.log("Last Sale Date Valid:", lastSaleDateValid);
       return isSameType && within250SqFt && withinLotSize && lastSaleDateValid;
      })
      .map((comp) => adjustComparable(subject, comp));

    if (filteredComps.length === 0) {
      console.warn("No comparables matched the filtering criteria.");
      res
        .status(200)
        .json({ message: "No comparables found matching criteria." });
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
