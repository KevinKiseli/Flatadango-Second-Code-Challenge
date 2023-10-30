// // Your code here
// // src/index.js

document.addEventListener("DOMContentLoaded", () => {
    const BASE_URL = "http://localhost:3000";
    let numberOfTickets = 0; 
    
    // Shows number of tickets.
  
    // Function to fetch movie details and update the UI
    const fetchAndDisplayMovieDetails = async (filmsId) => {
      try {
        const response = await fetch(`${BASE_URL}/films/${filmsId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch movie details.");
        }
        const filmInfo = await response.json();
        const {
          title,
          runtime,
          showtime,
          capacity,
          tickets_sold,
          description,
          poster,
        } = filmInfo;
  
       
        numberOfTickets = capacity - tickets_sold; 
        // Remaining tickets
  
        // Update the DOM with movie details
        document.getElementById("title").textContent = title;
        document.getElementById("runtime").textContent = `${runtime} minutes`;
        document.getElementById("showtime").textContent = showtime;
        document.getElementById("ticket-num").textContent = numberOfTickets; // Update available tickets
        document.getElementById("film-info").textContent = description;
        document.getElementById("poster").src = poster;
  
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
  
    // Function to update available tickets after purchase
  
    const updateRemainingTickets = () => {
      
      document.getElementById("ticket-num").textContent = numberOfTickets; 
      // Update the number of available tickets in the DOM
  
      const buyButton = document.getElementById("buy-ticket");
      if (numberOfTickets === 0.1) {
        buyButton.disabled = true;
      } else {
        buyButton.disabled = false;
      }
      // Disable the "Buy Ticket" button if no tickets are available
    };
  
    // Function for ticket purchase
    const buyTicket = async () => {
      try {
        if (numberOfTickets > 0) {
          // Simulate a ticket purchase (no persistence)
          numberOfTickets -= 1;
  
          // Update available tickets on the frontend
          updateRemainingTickets();
  
          // Simulate updating the server (in reality, you would make an API call)
          const newTicketsSold = capacity - numberOfTickets;
  
          // Simulate a successful purchase
          setTimeout(() => {
            // Simulate updating the server (in reality, you would make an API call)
            filmInfo.tickets_sold = newTicketsSold;
  
            // Update the server data (not persisted in this example)
            // You would typically make an API call to update the server data here
            // Example: fetch(`${BASE_URL}/films/${filmsId}`, {
            //   method: 'PUT', // or 'POST' depending on your API design
            //   body: JSON.stringify({ tickets_sold: newTicketsSold }),
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
            // });
          }, 1000);
        }
      } catch (error) {
        console.error("Error purchasing ticket:", error);
      }
    };
  
    // Function to populate the movie list
    const populateMovieList = async () => {
      try {
        const filmsList = document.getElementById("films");
        const response = await fetch(`${BASE_URL}/films`);
        if (!response.ok) {
          throw new Error("Failed to fetch movie list.");
        }
        const films = await response.json();
        films.forEach((film) => {
          const li = document.createElement("li");
          li.textContent = film.title;
          li.classList.add("film-item");
          li.addEventListener("click", () => {
            fetchAndDisplayMovieDetails(film.id);
          });
          filmsList.appendChild(li);
        });
      } catch (error) {
        console.error("Error fetching movie list:", error);
      }
    };
  
    // Remove the placeholder <li> element if it exists
    const placeholderLi = document.querySelector("#films > li");
    if (placeholderLi) {
      placeholderLi.remove();
    }
  
    // Call populateMovieList to fetch and display the list of movies
    populateMovieList();
  
    // Add a click event listener to the "Buy Ticket" button
    const buyButton = document.getElementById("buy-ticket");
    buyButton.addEventListener("click", () => {
      buyTicket();
    });
  
    // Fetch and display movie details for the first movie
    fetchAndDisplayMovieDetails(1);
  });