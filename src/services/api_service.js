import axios from 'axios';

const config = {
  baseURL: 'https://deckofcardsapi.com/api',
  timeout: 10000
};

const connect = axios.create(config);

export default {
  getInitialData() {
    return connect.get('/deck/new/shuffle/?deck_count=1')
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  getDrawData(deck_id) {
    return connect.get(`/deck/${deck_id}/draw/?count=52`)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  userLocation() {
    return axios.get(`http://www.geoplugin.net/json.gp`)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }
};
