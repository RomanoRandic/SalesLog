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
  const price = document.getElementById("priceInput").value;

  if (!code || !price) {
    alert("Please enter all fields!");
    return;
  }

  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // If the sale already exists in the log, add a new timestamp and update the quantity
  if (salesLog[code]) {
    salesLog[code].timestamps.push(timestamp);  // Add the timestamp to the array
    salesLog[code].quantity++; // Update quantity
  } else {
    // If item is new, add it to the log
      salesLog[code] = {
        type: getTypeFromCode(code),
        kind: getSpecificKind(code),
        code: code,
        quantity: 1,
        price: price,
        timestamps: [timestamp]
      };
    }
  
  renderTable();
}

// Function to delete a specific timestamp entry
function deleteTimestamp(code, timestampIndex) {
  const sale = salesLog[code];
  
  // If this is the only timestamp, delete the entire entry
  if (sale.timestamps.length === 1) {
    delete salesLog[code];
  } else {
    // Remove the specific timestamp
    sale.timestamps.splice(timestampIndex, 1);
    // Decrease quantity by 1
    sale.quantity = parseInt(sale.quantity) - 1;
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

    // Create the timestamps cell with delete buttons
    const timestampsCell = document.createElement("td");
    timestampsCell.className = "timestamp-list";
    
    sale.timestamps.forEach((timestamp, index) => {
      const timestampDiv = document.createElement("div");
      timestampDiv.style.display = "flex";
      timestampDiv.style.alignItems = "center";
      timestampDiv.style.marginBottom = "5px";
      
      const timestampSpan = document.createElement("span");
      timestampSpan.textContent = timestamp;
      
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "deleteButton";

      deleteButton.onclick = function() {
        deleteTimestamp(code, index);
      };
      
      timestampDiv.appendChild(timestampSpan);
      timestampDiv.appendChild(deleteButton);
      timestampsCell.appendChild(timestampDiv);
    });

    row.innerHTML = `
      <td class="phone">${sale.type}</td>
      <td class="phone">${sale.kind}</td>
      <td>${sale.code}</td>
      <td>${sale.quantity}</td>
      <td>${sale.price}</td>
    `;
    
    // Append the timestamps cell with delete buttons
    row.appendChild(timestampsCell);
    tableBody.appendChild(row);
  }
}

// Function to export data to Excel
function exportToExcel() {
  const formDataFromStorage = localStorage.getItem('formData');
  if (formDataFromStorage) {
      const formData = JSON.parse(formDataFromStorage);
      console.log('Retrieved form data:', formData);
      console.log(formData.typeOfPromotion);
  } else {
      console.log('No form data found in localStorage');
  }
  const formData = JSON.parse(formDataFromStorage);
  // Retrieve values from localStorage
  const promotor = formData.ime;
  const store = formData.store;
  const city = formData.city;
  const region = formData.region;
  const month = formData.month;
  const year = formData.year;
  const week = formData.week;
  const hour = formData.hours;
  const date = formData.date;
  const typeOfPromotion = formData.typeOfPromotion;

  // Prepare sales data
  const salesData = Object.values(salesLog).map(sale => ({
    promotor: promotor,
    store: store,
    city: city,
    region: region,
    month: month,
    year: year,
    week: week,
    date: date,
    typeOfPromotion: typeOfPromotion,
    hours: index === 0 ? hour : "",
    type: sale.type,
    kind: sale.kind,
    code: sale.code,
    quantity: sale.quantity,
    price: sale.price,
    timestamps: sale.timestamps.join(', ') // Export timestamps as comma-separated
  }));

  // Create Excel sheet
  const worksheet = XLSX.utils.json_to_sheet(salesData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sales Data');
  XLSX.writeFile(workbook, 'sales_data.xlsx');
}
