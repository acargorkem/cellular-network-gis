import './App.css';
import Map from './components/Map';
import Sidebar from './components/Sidebar/Sidebar';
import { hot } from 'react-hot-loader/root';

function App() {
  return (
    <div>
      <Map />
      <Sidebar />
    </div>
  );
}

export default hot(App);
