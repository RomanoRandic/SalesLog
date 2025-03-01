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

  const timestamp = new Date().toLocaleString();
  
  if (salesLog[code]) {
    // If item exists, add a new timestamp
    salesLog[code].timestamps.push(timestamp);
    salesLog[code].quantity=parseInt(salesLog[code].quantity) +parseInt( quantity);
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
