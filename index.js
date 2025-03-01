function saveFormData(event) {
    event.preventDefault();  // Prevent the default form submission behavior
    localStorage.clear();

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
        date: document.getElementById('date').value,
        type: document.getElementById('type').value,
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