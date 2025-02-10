// Set the current date in the hidden date field
document.addEventListener("DOMContentLoaded", () => {
  const currentDate = new Date().toISOString().split("T")[0];
  document.getElementById("date").value = currentDate;
});



// AFFILIATE FORM


// Attach an event listener to handle form submission
document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Show a loading message
    const formResponse = document.getElementById("formResponse");
    formResponse.textContent = "Submitting your response, please wait...";

    // Gather form data
    const formData = new FormData(this);

    // Send data to the Google Apps Script endpoint
    fetch(
      "https://script.google.com/macros/s/AKfycbzRXwQ0qjGBIuHiCZVMvlHmqG4yqMDdKwY7HGqQYpv0O8OGTpS6GerwcOIzEjJeEvqH/exec",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.text())
      .then((data) => {
        // Display a success message
        formResponse.textContent =
          "Thank you! Your submission has been received.";

        // Reset the form fields
        document.getElementById("contactForm").reset();

        // Reset the date field with the current date
        const currentDate = new Date().toISOString().split("T")[0];
        document.getElementById("date").value = currentDate;

        setTimeout(() => {
          formResponse.textContent = "";
        }, 2000);
      })
      .catch((error) => {
        // Display an error message
        formResponse.textContent =
          "An error occurred while submitting. Please try again.";
      });
  });

