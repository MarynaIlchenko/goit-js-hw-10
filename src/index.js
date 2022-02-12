import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import countryCardTemplate from '../src/templates/country-card.hbs';
import countryListTemplate from '../src/templates/country-list.hbs';

const DEBOUNCE_DELAY = 300;
const inputRef = document.querySelector('input#search-box');
const countryInfoRef = document.querySelector('div.country-info');
const countryListRef = document.querySelector('ul.country-list');
let dataInput = '';
