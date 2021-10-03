export default function geospatialData(state = 'null', action) {
  switch (action.type) {
    case 'DATA_IMPORTED':
      return action.payload;
    default:
      return state;
  }
}
