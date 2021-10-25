import './App.css';
import Map from './components/Map';
import Sidebar from './components/Sidebar/Sidebar';
import { hot } from 'react-hot-loader/root';
import LoadingPage from './components/LoadingPage';

function App() {
  return (
    <div>
      <Map />
      <Sidebar />
      <LoadingPage />
    </div>
  );
}

export default hot(App);
