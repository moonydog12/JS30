# Project Planning

**Planning Steps**

1. User stories :
2. Features
3. Flowchart
4. Architecture

## User Stories

Description of the application's functionality from the users' perspective

format: As a `type of user`, I want `action` so that `a benefit`

1. log my running workouts with location, distance time, pace and steps/minute
2. log my cycling workouts
3. see all my workouts at a glance
4. See my workouts on a map
5. see all my workouts when I leave the app and come back later

## Features

1. US1
   - Map where the user clicks to add a new workout
   - Geolocation to display the map at the current location
   - Form to input data
2. US2
   - Form to input data
3. US3
   - Display all workouts in a list
4. US4
   - Display all workouts on the map
5. US5
   - Store workout data in the browser using local storage
   - On page load, read the saved data from the local storage

## Flowchart

![flowchart](img/Mapty-flowchart.png)

## Architecture

![architecture](img/Mapty-architecture-final.png)

**Class Workout :**

Class Workout would be inherited by two classes (Running/Cycling)

```js
class Workout {
  date = new Date();
  // Get the last 10 number as the unique id for each workout
  id = `${Date.now()}`.slice(-10);

  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }

  _setDescription() {
    // set unique description for each workout
  }
}

class Running extends Workout {
  type = 'running';

  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    // ...
  }
}

class Cycling extends Workout {
  type = 'cycling';

  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    // ...
  }
}
```

**Class App :**

```js
class App {
  #map;

  #mapZoomLevel = 13;

  #mapEvent;

  #workouts = [];
  // load page as the class is Instantiation(實例化)
  constructor() {
    this._getPosition();
    this._getLocalStorage();
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
  }

  // get users' current geo location
  _getPosition() {
    //  ...
  }

  // use leaflet library to render the map
  _loadMap(position) {
    // ...
  }

  // click on map
  _showForm(e) {
    // ...
  }

  // clean input fields
  _hideForm() {
    // ...
  }

  // Change input
  _toggleElevationField() {
    // ...
  }

  // submit form
  _newWorkout(e) {
    // ...
  }

  // render marker on the map(leaflet)
  _renderWorkoutMarker(workout) {
    // ...
  }

  // render template on the sidebar
  _renderWorkout(workout) {
    // ...
  }

  // click workout on the sidebar will change map position(UI)
  _moveToPopup(e) {
    //  ...
  }

  // save current map data to localStorage
  _setLocalStorage() {
    // ...
  }

  // get data from localStorage
  _getLocalStorage() {
    //  ...
  }
}
```
