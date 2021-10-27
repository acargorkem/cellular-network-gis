import './Infobox.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { geojsonSlice } from '../store/geojsonSlice';
import WorkingAreaSelector from './WorkingAreaSelector';
import EditableText from './EditableText';

export default function Infobox(props) {
  const selectedFeature = useSelector(
    (state) => state.coverageArea.geoJson.features[props.arrayIndex]
  );
  const dispatch = useDispatch();

  const closeButtonHandle = () => {
    props.closeInfobox();
  };

  const editableTextOnChange = (text) => {
    dispatch(
      geojsonSlice.actions.setPropertyName({
        index: props.arrayIndex,
        name: text,
      })
    );
  };

  return (
    <div className="infobox-container">
      <div className="infobox-title">
        <h3>
          <EditableText
            content={selectedFeature.properties.name}
            onChange={editableTextOnChange}
          />
        </h3>
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
