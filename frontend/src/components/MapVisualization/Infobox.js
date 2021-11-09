import './Infobox.css';
import WorkingAreaSelector from './WorkingAreaSelector';
import EditableText from '../EditableText';
import { connect } from 'react-redux';
import { setInfoboxStatus } from '../../store/infoboxSlice';

function Infobox(props) {
  const closeButtonHandle = () => {
    props.setInfoboxStatus('inactive');
  };

  const editableTextOnChange = (text) => {
    props.setName(text, props.arrayIndex);
  };

  if (props.status == 'inactive') {
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

const mapStateToProps = (state) => {
  return {
    feature: state.infobox.feature,
    arrayIndex: state.infobox.featureIndex,
    distance: state.infobox.coverageDistance,
    status: state.infobox.status,
  };
};

const mapDispatchToProps = {
  setInfoboxStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(Infobox);
