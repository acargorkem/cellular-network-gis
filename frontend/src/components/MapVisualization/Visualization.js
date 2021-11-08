import { useState } from 'react';
import { GeoJsonDataSource } from 'resium';
import CoverageArea from './CoverageArea';
import antennaLogo from '../../assets/icons/communications-tower.svg';
import Infobox from './Infobox';

export default function Visualization(props) {
  const [isInfoboxActive, setIsInfoboxActive] = useState(false);
  const [infoboxIndex, setInfoboxIndex] = useState(null);
  const [infoboxFeature, setInfoboxFeature] = useState({});

  const onLoadHandle = (loadEvent) => {
    changeIcons(loadEvent);
  };

  const changeIcons = (loadEvent) => {
    loadEvent.entities.values.map((item) => {
      item.billboard.image = antennaLogo;
      item.billboard.scale = 1.5;
    });
  };

  const openInfobox = (entity) => {
    setIsInfoboxActive(false);
    let id = entity.id.id;
    let collection = entity.id.entityCollection.values.map((item) => item.id);
    let index = collection.indexOf(id);
    setInfoboxFeature(props.data.geoJson.features[index]);
    setInfoboxIndex(index);
    setIsInfoboxActive(true);
  };

  const closeInfobox = () => {
    setIsInfoboxActive(false);
  };

  return (
    <>
      <GeoJsonDataSource
        // TODO: CLUSTER EFFECT- SMALL ICONS ON ZOOM OUT
        data={props.data.geoJson}
        onLoad={(e) => onLoadHandle(e)}
        onClick={(_, entity) => openInfobox(entity)}
      ></GeoJsonDataSource>
      <CoverageArea
        distances={props.data.distances}
        features={props.data.geoJson.features}
      />
      {isInfoboxActive && (
        // TODO: KNOWN ISSUE infobox render twice for both file and marker visualization
        <Infobox
          isInfoboxActive={isInfoboxActive}
          closeInfobox={closeInfobox.bind(this)}
          arrayIndex={infoboxIndex}
          distance={props.data.distances[infoboxIndex]}
          feature={infoboxFeature}
          setName={props.setName}
          setDistance={props.setDistance}
        />
      )}
    </>
  );
}
