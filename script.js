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
      "https://script.google.com/macros/s/AKfycbyDxlcu2-o0HddW7_K-dQGzXfphCwR5uwgA0W2d3q5NUElRyMzuCQ3SIH18L5FogHpA/exec",
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






//  JOBS FORM



  document
  .getElementById("uniq-jobscontactForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    let jobsformResponse = document.getElementById("uniq-jobsformResponse");
    jobsformResponse.innerText = "Submitting your response, please wait...";
    jobsformResponse.style.color = "green"; // Set color to blue for processing

    let formData = new FormData(this);
    let file = document.getElementById("file").files[0];

    // Convert file to Base64
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async function () {
      let base64String = reader.result.split(",")[1];

      formData.append("file", base64String);
      formData.append("fileName", file.name);

      let response = await fetch("https://script.google.com/macros/s/AKfycbwob3lufgWaLpLAFdvmUAEh_TFZrx8u8wo8jo2xfV8neKcvpfjCxn4DMNwQ9dLZjALS/exec", {
        method: "POST",
        body: formData,
      });

      let result = await response.json();

      if (result.result === "success") {
        jobsformResponse.innerText =
          "Thank you! Your submission has been received.";
          jobsformResponse.style.color = "green"; // Set color to green for success

        // Reset form fields
        document.getElementById("uniq-jobscontactForm").reset();

        // Remove success message after 2 seconds
        setTimeout(() => {
          jobsformResponse.innerText = "";
        }, 2000);
      } else {
        jobsformResponse.innerText = "Error: " + result.message;
        jobsformResponse.style.color = "red"; // Set color to red for error
      }
    };
  });