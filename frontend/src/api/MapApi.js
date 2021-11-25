import api from './api-config';

class MapApi {
  uploadKmlFile(file) {
    return api.post('file-upload/kml', file);
  }

  uploadGeojsonFile(file) {
    return api.post('file-upload/geojson', file);
  }
}

export default new MapApi();
