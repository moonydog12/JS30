// Main app architecture
import Running from './classes/Running.js';
import Cycling from './classes/Cycling.js';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  #map;

  #mapZoomLevel = 13;

  #mapEvent;

  #workouts = [];

  // Triggered when instantiate an object
  constructor() {
    this.getPosition();

    // get data from local storage
    this.getLocalStorage();

    // Event listeners
    form.addEventListener('submit', this.newWorkout.bind(this));
    inputType.addEventListener('change', this.toggleElevationField);
    containerWorkouts.addEventListener('click', this.moveToPopup.bind(this));
  }

  getPosition() {
    // Get the geolocation data
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.loadMap.bind(this), (err) => {
        window.alert(err);
      });
    }
  }

  loadMap(position) {
    const { latitude, longitude } = position.coords;
    const cords = [latitude, longitude];
    // Use leatlet library
    this.#map = L.map('map').setView(cords, this.#mapZoomLevel);
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Listen leaflet map click event
    this.#map.on('click', this.showForm.bind(this));

    this.#workouts.forEach((workout) => this.renderWorkoutMarker(workout));
  }

  showForm(event) {
    // Assign leaflet map event object to global variable
    this.#mapEvent = event;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  static hideForm() {
    // Clear input fields
    inputDistance.value = '';
    inputDuration.value = '';
    inputType.value = '';
    inputCadence.value = '';
    inputElevation.value = '';
    form.style.display = 'none';
    form.classList.add('hidden');

    // dirty trick
    setTimeout(() => {
      form.style.display = 'grid';
    }, 1000);
  }

  static toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  newWorkout(event) {
    // Validate input field to be number
    const validInputs = (...inputs) => inputs.every((input) => Number.isFinite(input));

    // Validate input value to be positive
    const allPositive = (...inputs) => inputs.every((input) => input > 0);

    event.preventDefault();

    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;

    let workout;

    // If activity running,create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;

      if (!validInputs(distance, duration, cadence) || !allPositive(distance, duration, cadence)) {
        return alert('Inputs have to be positive numbers!');
      }

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // If workout cycling, create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;

      if (!validInputs(distance, duration, elevation) || !allPositive(distance, duration)) {
        return alert('Inputs have to be positive numbers!');
      }

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new object to workout array
    this.#workouts.push(workout);

    // Render workout on map as marker
    this.renderWorkoutMarker(workout);

    // Render workout on list
    this.renderWorkout(workout);

    // Hide form + clear input fields
    this.hideForm();

    // Set local storage to all workouts
    this.setLocalStorage();
  }

  renderWorkoutMarker(workout) {
    // display marker
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        }),
      )
      .setPopupContent(`${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`)
      .openPopup();
  }

  renderWorkout(workout) {
    let template = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <h2 class="workout__title">${workout.description}</h2>
      <div class="workout__details">
        <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
      </div>
    `;

    if (workout.type === 'running') {
      template += `
         <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        <li>  
          `;
    } else if (workout.type === 'cycling') {
      template += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.speed.toFixed(1)}</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${workout.elevationGain}</span>
          <span class="workout__unit">m</span>
        </div>
      </li>
      `;
    }
    // Insert DOM
    form.insertAdjacentHTML('afterend', template);
  }

  moveToPopup(event) {
    const workoutEl = event.target.closest('.workout');
    if (!workoutEl) return;

    const workout = this.#workouts.find((work) => work.id === workoutEl.dataset.id);

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }

  setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));

    if (!data) return;

    // if there are data in localStorage,store them to 'workouts' array
    this.#workouts = data;
    this.#workouts.forEach((workout) => {
      this.renderWorkout(workout);
    });
  }
}

const app = new App();
