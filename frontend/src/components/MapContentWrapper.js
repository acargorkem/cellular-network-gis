import Sidebar from './Sidebar/Sidebar';
import Map from './Map';
import './MapContentWrapper.css';

export default function MapContentWrapper() {
  return (
    <div className="map-content-wrapper">
      <Sidebar />
      <div id="map-content-feature" className="map-content-feature">
        <Map />
      </div>
    </div>
  );
}
