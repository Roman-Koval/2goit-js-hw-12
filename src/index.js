import './css/styles.css';
import debounce from 'lodash.debounce';
import countryCardTemplate from './temp/country_card.hbs';
import countryTemplate from './temp/country.hbs';
import { fetchCountries } from './fetchCountries';

import Notiflix from 'notiflix';

const manyMessage = 'Too many matches found. Please enter a more specific name.';
const oopsMmessage = 'Oops, there is no country with that name, buy the globe';

const DEBOUNCE_DELAY = 300;

const findCountryField = document.querySelector('#search-box');
const countryListArea = document.querySelector('.country-list');

findCountryField.addEventListener('input', debounce(onInputCountryName, DEBOUNCE_DELAY));

function onInputCountryName(event) {
  const inp = event.target.value;
  if (inp.trim () !== "") {

  fetchCountries(inp)
    .then(countries => {
     
      if (countries.length > 10) {
        addMessage('info', manyMessage);
      }

      if (countries.length === 1) {
        renderCountry(countryCardTemplate(countries));
      }

      if (countries.length >= 2 && countries.length <= 10) {
        renderCountry(countryTemplate(countries));
      }
    })
    .catch(error => addMessage('failure', oopsMmessage));
}
}

function renderCountry(markup = '') {
  countryListArea.innerHTML = markup;
}

function addMessage(typeMessage, message) {
  Notiflix.Notify[typeMessage](message);
}