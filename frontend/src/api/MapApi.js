import api from './apiConfig';

class MapApi {
  getMap() {
    return api.get('/');
  }
}

export default new MapApi();
