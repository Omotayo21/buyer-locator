import jsPDF from "jspdf";
import "jspdf-autotable";

// Calculate ARV Percent
export const calculateArvPercent = (comp, acquisitionPrice) => {
  const lastSaleAmount = parseFloat(comp?.lastSaleAmount);
  const acqPrice = parseFloat(acquisitionPrice.split(",").join(""));

  if (!acqPrice || !lastSaleAmount || lastSaleAmount === 0) {
    return 0;
  }

  return ((acqPrice / lastSaleAmount) * 100).toFixed(2);
};

// Format Number with Commas
export const formatNumber = (num) => {
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Save Table as PDF
export const saveAsPDF = (comparables) => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("Comparable Locator Report", 10, 10);

  const tableHeaders = [["ID", "Name", "Address", "Sold Price", "ARV%"]];
  const tableRows = comparables.map((comp) => [
    comp?.id || "N/A",
    `${comp?.owner1FirstName || ""} ${comp?.owner1LastName || ""}`.trim() || "N/A",
    comp?.address?.address || "N/A",
    comp?.lastSaleAmount || "N/A",
    calculateArvPercent(comp) + "%",
  ]);

  doc.autoTable({
    head: tableHeaders,
    body: tableRows,
    startY: 20,
    styles: { fontSize: 6, cellPadding: 4 },
    headStyles: {
      fillColor: [0, 123, 255],
      textColor: 255,
      fontStyle: "bold",
    },
  });

  doc.save("comparable-locator-report.pdf");
};
