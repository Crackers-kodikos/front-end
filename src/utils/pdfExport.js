/**
 * Generate a fake PDF file and trigger download
 * @param {string} filename - The filename for the PDF (default: 'orders.pdf')
 * @param {Array} orders - Optional array of orders to include in PDF
 */
export const exportOrdersAsPDF = (filename = 'orders.pdf', orders = []) => {
  // Create a simple text-based PDF content (very basic PDF structure)
  const now = new Date().toLocaleString();
  
  const pdfContent = generatePDFContent(orders, now);
  
  // Create a blob from the PDF content
  const blob = new Blob([pdfContent], { type: 'application/pdf' });
  
  // Create a temporary URL for the blob
  const url = window.URL.createObjectURL(blob);
  
  // Create a temporary anchor element and trigger download
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

/**
 * Generate basic PDF content
 * @param {Array} orders - Array of orders
 * @param {string} timestamp - Current timestamp
 * @returns {string} PDF content
 */
function generatePDFContent(orders, timestamp) {
  // Basic PDF header
  const pdfHeader = '%PDF-1.4\n';
  
  // Create a simple text content
  let textContent = `
ORDERS REPORT
Generated: ${timestamp}

==================================================

Total Orders: ${orders.length || 12}

`;

  if (orders.length > 0) {
    textContent += '\nORDER DETAILS:\n\n';
    orders.forEach((order, index) => {
      textContent += `Order ${index + 1}:\n`;
      textContent += `ID: ${order.id || 'N/A'}\n`;
      textContent += `Date: ${order.date || 'N/A'}\n`;
      textContent += `Status: ${order.status || 'N/A'}\n`;
      textContent += `Amount: ${order.amount || 'N/A'}\n`;
      textContent += `--------------------------------------------------\n\n`;
    });
  } else {
    // Default mock data if no orders provided
    textContent += '\nSample Orders:\n\n';
    for (let i = 1; i <= 5; i++) {
      textContent += `Order ${i}:\n`;
      textContent += `ID: ORD-${String(i).padStart(5, '0')}\n`;
      textContent += `Date: 2025-11-${String(i * 2).padStart(2, '0')}\n`;
      textContent += `Status: Completed\n`;
      textContent += `Amount: $${(Math.random() * 500 + 50).toFixed(2)}\n`;
      textContent += `--------------------------------------------------\n\n`;
    }
  }

  textContent += '\n==================================================\n';
  textContent += 'End of Report\n';

  // Simple PDF structure (very basic, just for demo)
  const pdfBody = `1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 612 792] /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
5 0 obj
<< /Length ${textContent.length} >>
stream
BT
/F1 12 Tf
50 750 Td
(${escapeText(textContent)}) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000274 00000 n 
0000000352 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
${pdfHeader.length + pdfBody.length}
%%EOF`;

  return pdfHeader + pdfBody;
}

/**
 * Escape special characters for PDF text
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeText(text) {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/[\r\n]/g, ' ');
}

/**
 * Export orders as CSV (alternative format)
 * @param {string} filename - The filename for the CSV
 * @param {Array} orders - Array of orders to export
 */
export const exportOrdersAsCSV = (filename = 'orders.csv', orders = []) => {
  let csvContent = 'ID,Date,Status,Amount\n';

  if (orders.length > 0) {
    orders.forEach(order => {
      csvContent += `${order.id || 'N/A'},${order.date || 'N/A'},${order.status || 'N/A'},${order.amount || 'N/A'}\n`;
    });
  } else {
    // Mock data
    for (let i = 1; i <= 5; i++) {
      csvContent += `ORD-${String(i).padStart(5, '0')},2025-11-${String(i * 2).padStart(2, '0')},Completed,$${(Math.random() * 500 + 50).toFixed(2)}\n`;
    }
  }

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
