import './Infobox.css';
import { useSelector } from 'react-redux';
import WorkingAreaSelector from './WorkingAreaSelector';

export default function Infobox(props) {
  const selectedFeature = useSelector(
    (state) => state.coverageArea.geoJson.features[props.arrayIndex]
  );

  const closeButtonHandle = () => {
    props.closeInfobox();
  };

  return (
    <div className="infobox-container">
      <div className="infobox-title">
        <h3>{selectedFeature.properties.name}</h3>
        <button
          className="infobox-button button-close"
          onClick={closeButtonHandle}
        >
          Close
        </button>
      </div>
      <div className="infobox-content">
        <WorkingAreaSelector arrayIndex={props.arrayIndex} />
      </div>
    </div>
  );
}
