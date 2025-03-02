function saveFormData(event) {
    event.preventDefault();  // Prevent the default form submission behavior
    localStorage.clear();
    
    // Get the date value
    const dateInput = document.getElementById('date').value;
    
    // Format the date as dd.mm.yyyy with leading zeros
    let formattedDate = '';
    if (dateInput) {
        const dateObj = new Date(dateInput);
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // +1 because months are 0-indexed
        const year = dateObj.getFullYear();
        formattedDate = `${day}.${month}.${year}`;
    }
    
    const formData = {
        ime: document.getElementById("ime").value,
        store: document.getElementById('odabirTrgovine').value,
        city: document.getElementById('city').value,
        region: document.getElementById('region').value,
        month: document.getElementById('month').value,
        year: document.getElementById('year').value,
        week: document.getElementById('week').value,
        day: document.getElementById('day').value,
        time: document.getElementById('time').value,
        date: formattedDate, // Use the formatted date string
        typeOfPromotion: document.getElementById('typeOfPromotion').value,
        hours: document.getElementById('hours').value,
        timestamp: new Date().toISOString()
    };
    

    // Log the form data to the console
    console.log("Form data saved:", formData);

    // Store form data in localStorage as a JSON string
    localStorage.setItem('formData', JSON.stringify(formData));

    // Optionally, display form data in the result div
    document.getElementById("result").textContent = JSON.stringify(formData, null, 2);
}
function posaljiDalje(){
    window.location.href = "log.html";

}