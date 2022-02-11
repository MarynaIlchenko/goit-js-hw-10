import '../css/styles.css';

const BASE_URL = 'https://restcountries.com/v3.1';

function fetchCountries(name) {
  fetch(`${BASE_URL}/name/${name}?fields=name,capital,population,flags,languages`)
    .then(response => {
      return response.json();
    })
    .then(country => {
      console.log(country);
    })
    .catch(error => [console.log(error)]);
}
