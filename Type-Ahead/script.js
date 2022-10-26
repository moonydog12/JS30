const endpoint =
  'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

// fetch API
fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => cities.push(...data));

const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

function findMatches(wordToMatch, matchedCities) {
  return matchedCities.filter((place) => {
    // 確認city || state 符合搜尋字串
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  });
}

function displayMatches() {
  if (!searchInput.value || searchInput.value === '') {
    suggestions.innerHTML = `
  <li>
    <span class="name">No input value</span>
    <span class="population">The Missing</span>
  </li>
  `;
    return;
  }
  const matchArray = findMatches(this.value, cities);
  const html = matchArray
    .map((place) => {
      const regex = new RegExp(this.value, 'gi');
      const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
      const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
      return `
    <li>
      <span class="name">${cityName}, ${stateName}</span>
      <span class="population">${numberWithCommas(place.population)}</span>
    </li>
    `;
    })
    .join('');
  suggestions.innerHTML = html;
}

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
