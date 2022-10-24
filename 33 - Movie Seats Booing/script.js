const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.querySelector('#count');
const total = document.querySelector('#total');
const movieSelect = document.querySelector('#movie');

let ticketPrice = Number(movieSelect.value);

// Function
// Save selected movie index & price
const setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
};
// Update total and count
const updateCountAndTotal = () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  // Copy selected seats into arr
  const seatsIndex = [...selectedSeats]
    // Map through array (return a new array of index)
    .map((seat) => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  const selectedSeatsCount = selectedSeats.length;
  count.textContent = selectedSeatsCount;
  total.textContent = ticketPrice * selectedSeatsCount;

  setMovieData(movieSelect.selectedIndex, movieSelect.value);
};
// Get data from localStorage & populate UI
const populateUI = () => {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
};

// Event Listener
// Movie select input event
movieSelect.addEventListener('change', (e) => {
  ticketPrice = Number(e.target.value);
  setMovieData(e.target.selectedIndex, e.target.value);
  updateCountAndTotal();
});
// Seat click event
container.addEventListener('click', (e) => {
  // Event Delegate
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');

    updateCountAndTotal();
  }
});

// Initial count and total set
populateUI();
updateCountAndTotal();
