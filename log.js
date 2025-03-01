let salesLog = {};

// Function to determine the type based on the first letter of the code
function getTypeFromCode(code) {
  if (!code) return "Unknown";
  const firstLetter = code.charAt(0).toUpperCase()+code.charAt(1).toUpperCase();
  const typeMap = {
    "PS": "GARMENT CARE",
    "ST": "GARMENT CARE",
    "DS": "GARMENT CARE",
    "FC": "FLOOR CARE",
    "XB": "FLOOR CARE",
    "XD": "FLOOR CARE",
    "XC": "FLOOR CARE",
    "XW": "FLOOR CARE",
    "XU": "FLOOR CARE",
    "CA": "COFFE",
    "EP": "COFFE",
    "NA": "KITCHEN APPLIANCES"


    // Add more mappings as needed
  };
  return typeMap[firstLetter] || "Other";
}

// Function to determine the specific kind (placeholder, user can extend)
function getSpecificKind(code) {
  if (!code) return "Unknown";
  const firstLetter = code.charAt(0).toUpperCase()+code.charAt(1).toUpperCase();

  const kindMap = {
    "PS": "Parna postaja",
    "ST": "Uređaj za okomito glačanje na paru",
    "DS": "Glačalo",
    "FC": "Usisavač",
    "XB": "Usisavač",
    "XD": "Usisavač",
    "XC": "Usisavač",
    "XW": "Aqua trio",
    "XU": "Robotski usisavač",
    "CA": "Komplet za održavanje",
    "EP": "Espresso aparat",
    "NA": "Friteza na vrući zrak"
    // Add more mappings as needed
  };
  return kindMap[firstLetter] || "Other";
}

// Function to log a sale
function logSale() {
  const code = document.getElementById("codeInput").value.trim().toUpperCase();
  const quantity = document.getElementById("quantityInput").value;
  const price = document.getElementById("priceInput").value;

  if (!code || !quantity || !price) {
    alert("Please enter all fields!");
    return;
  }

  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // If the sale already exists in the log, add a new timestamp and update the quantity
  if (salesLog[code]) {
    salesLog[code].timestamps.push(timestamp);  // Add the timestamp to the array
    salesLog[code].quantity = parseInt(salesLog[code].quantity) + parseInt(quantity); // Update quantity
  } else {

    // If item is new, add it to the log
    salesLog[code] = {
      type: getTypeFromCode(code),
      kind: getSpecificKind(code),
      code: code,
      quantity: quantity,
      price: price,
      timestamps: [timestamp]
    };
  }

  renderTable();
}

// Function to update the table
function renderTable() {
  const tableBody = document.getElementById("salesTable");
  tableBody.innerHTML = ""; // Clear table

  for (let code in salesLog) {
    const sale = salesLog[code];
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${sale.type}</td>
      <td>${sale.kind}</td>
      <td>${sale.code}</td>
      <td>${sale.quantity}</td>
      <td>${sale.price}</td>
      <td class="timestamp-list">${sale.timestamps.join("<br>")}</td>
    `;

    tableBody.appendChild(row);
  }
}
// Function to export data to Excel
function exportToExcel() {
  const formDataFromStorage = localStorage.getItem('formData');
  if (formDataFromStorage) {
      const formData = JSON.parse(formDataFromStorage);
      console.log('Retrieved form data:', formData);
  } else {
      console.log('No form data found in localStorage');
  }
  const formData = JSON.parse(formDataFromStorage);
  // Retrieve values from localStorage
  const promotor = formData.ime;
  console.log(formData.ime);
  const store = formData.store;
  const city = formData.city;
  const region = formData.region;
  const month = formData.month;
  const year = formData.year;
  const week = formData.week;
  const hour = formData.hours;
  const date = formData.date;

  // Check if any value is missing in localStorage


  // Prepare sales data
  const salesData = Object.values(salesLog).map(sale => ({
    promotor: promotor,
    store: store,
    city: city,
    region: region,
    month: month,
    year: year,
    week: week,
    hours: hour,
    type: sale.type,
    date:date,
    kind: sale.kind,
    code: sale.code,
    quantity: sale.quantity,
    price: sale.price,
    timestamps: sale.timestamps.join(', ')// Export timestamps as newline-separated
  }));

  // Create Excel sheet
  const worksheet = XLSX.utils.json_to_sheet(salesData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sales Data');
  XLSX.writeFile(workbook, 'sales_data.xlsx');
}
