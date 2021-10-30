import './App.css';
import Map from './components/Map';
import Sidebar from './components/Sidebar/Sidebar';
import { hot } from 'react-hot-loader/root';
import './components/MapContentWrapper.css';
import LoadingPage from './components/LoadingPage';
// import MapContentWrapper from './components/MapContentWrapper';

function App() {
  return (
    <div>
      <div className="map-content-wrapper">
        {
          //TODO: importing MapContentWrapper causes error on hot loader module
          //replace this block with MapContentWrapper component
        }
        <Sidebar />
        <div id="map-content-feature" className="map-content-feature">
          <Map />
        </div>
      </div>

      <LoadingPage />
    </div>
  );
}

export default hot(App);
