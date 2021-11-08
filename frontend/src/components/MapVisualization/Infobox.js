import './Infobox.css';
import WorkingAreaSelector from './WorkingAreaSelector';
import EditableText from '../EditableText';

export default function Infobox(props) {
  const closeButtonHandle = () => {
    props.closeInfobox();
  };

  const editableTextOnChange = (text) => {
    props.setName(text, props.arrayIndex);
  };

  if (!props.isInfoboxActive) {
    return null;
  }

  return (
    <div className="infobox-container">
      <div className="infobox-title">
        <h3>
          <EditableText
            content={props.feature.properties.name}
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
        <WorkingAreaSelector
          arrayIndex={props.arrayIndex}
          selectedDistance={props.distance}
          setDistance={props.setDistance}
        />
      </div>
    </div>
  );
}
