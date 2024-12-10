// --- User Management Functions ---

// Function to show the SignUp form
function showSignup() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("signup-form").style.display = "block";
}

// Function to show the Login form
function showLogin() {
  document.getElementById("signup-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
}

// Function to handle user signup
async function signup() {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const accountType = document.getElementById("account-type").value;

  const response = await fetch("/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, accountType }),
  });

  if (response.ok) {
    alert("Sign Up Successful");
    showLogin();
  } else {
    alert("Error Signing Up");
  }
}

// Function to handle user login
async function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const data = await response.json();
    alert(`Logged in!`);

    // Show the cities section after successful login
    showCitiesSection();
  } else {
    alert("Invalid Credentials");
  }
}

// Function to show the cities section after login
function showCitiesSection() {
  document.getElementById("cities-section").style.display = "block"; // Show the cities section
  document.getElementById("login-form").style.display = "none"; // Hide the login form
}

// Function to handle the area and city selection after login
function submitLocation() {
  const area = document.getElementById("area").value;
  const city = document.getElementById("city").value;

  if (area && city) {
    alert(`Area: ${area}, City: ${city}`);
    redirectToDashboard(); // Redirect to the new page
  } else {
    alert("Please select both an area and a city.");
  }
}

// Function to redirect to a new page after successful location selection
function redirectToDashboard() {
  // Example: Redirect to a dashboard page
  window.location.href = "dashboard.html";
}

// --- News Feed Functions ---

// Static news feed data (could be replaced with API data later)
const newsItems = [
  {
    title: "New Campus Event Announced!",
    description:
      "Join us for the upcoming student career fair next week. It's a great opportunity to network with top companies.",
    date: "December 10, 2024",
  },
  {
    title: "Library Renovation Updates",
    description:
      "The campus library is undergoing major renovations. Here's everything you need to know about the changes.",
    date: "December 9, 2024",
  },
  {
    title: "New Cafeteria Menu Available",
    description:
      "Check out the new, healthy options in the campus cafeteria starting this week.",
    date: "December 8, 2024",
  },
  {
    title: "Scholarship Opportunities for Students",
    description:
      "A new round of scholarships is available. Apply now for various academic and extracurricular scholarships.",
    date: "December 7, 2024",
  },
];

// Function to display the news feed
function displayNewsFeed() {
  const newsFeedContainer = document.getElementById("news-feed");

  // Clear existing news items (if any)
  newsFeedContainer.innerHTML = "<h2>Campus News</h2>";

  newsItems.forEach((item) => {
    // Create a new div for each news item
    const newsItemDiv = document.createElement("div");
    newsItemDiv.classList.add("news-item");

    // Set the inner HTML of the news item
    newsItemDiv.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <p class="date">Published on: ${item.date}</p>
    `;

    // Append the news item to the news feed container
    newsFeedContainer.appendChild(newsItemDiv);
  });
}
