import './css/styles.css';
import { fetchCountries } from '../src/js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import countryListTemplate from '../src/templates/country-list.hbs';
import countryCardTemplate from '../src/templates/country-card.hbs';

const DEBOUNCE_DELAY = 300;
const inputRef = document.querySelector('#search-box');
const countryListRef = document.querySelector('ul.country-list');
const countryInfoRef = document.querySelector('div.country-info');

let inputField = '';

inputRef.addEventListener('input', debounce(inputData, DEBOUNCE_DELAY));

function inputData(event) {
  inputField = event.target.value.trim();
  countryInfoRef.innerHTML = '';
  countryListRef.innerHTML = '';
  if (inputField !== '') {
    fetchCountries(inputField).then(renderCountryCard).catch(onErrorMessage);
  }
}

function renderCountryCard(countries) {
  if (countries.length > 10) {
    tooManyMatches();
  } else if (countries.length > 1 && countries.length <= 10) {
    createCountryList(countries);
  } else {
    createCountryInfo(countries);
  }
}

function createCountryList(countries) {
  countries.map(country => {
    countryListRef.insertAdjacentHTML('beforeend', countryListTemplate(country));
  });
}

function createCountryInfo(countries) {
  let { name, flags, capital, population, languages } = countries[0];
  languages = languages.map(language => language.name).join(', ');
  countryInfoRef.insertAdjacentHTML(
    'beforeend',
    countryCardTemplate({ name, flags, capital, population, languages }),
  );
}

function tooManyMatches() {
  Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
}

function onErrorMessage() {
  Notiflix.Notify.failure('Oops, there is no country with that name.');
}
