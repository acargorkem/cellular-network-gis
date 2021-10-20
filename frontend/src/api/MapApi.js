import api from './api-config';

class MapApi {
  uploadKmlFile(file) {
    return api.post('file-upload', file);
  }
}

export default new MapApi();
