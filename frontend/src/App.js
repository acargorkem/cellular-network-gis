import './App.css';
import Map from './components/Map';
import { hot } from 'react-hot-loader/root';

function App() {
  return (
    <div>
      <Map>
        <button>button</button>
      </Map>
    </div>
  );
}

export default hot(App);
