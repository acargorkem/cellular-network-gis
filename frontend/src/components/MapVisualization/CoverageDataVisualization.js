import { GeoJsonDataSource } from 'resium';
import CoverageArea from './CoverageArea';
import antennaLogo from '../../assets/icons/communications-tower.svg';
import { Color, LabelStyle, Cartesian2, VerticalOrigin } from 'cesium';

export default function CoverageDataVisualization(props) {
  const onLoadHandle = (loadEvent) => {
    addLabel(loadEvent);
    changeIcons(loadEvent);
  };

  const changeIcons = (loadEvent) => {
    loadEvent.entities.values.map((item) => {
      item.billboard.image = antennaLogo;
      item.billboard.scale = 1.5;
    });
  };

  const addLabel = (loadEvent) => {
    loadEvent.entities.values.map((item) => {
      item.label = {
        text: item.name,
        font: '14px Helvetica',
        fillColor: Color.WHITE,
        outlineColor: Color.BLACK,
        outlineWidth: 4,
        style: LabelStyle.FILL_AND_OUTLINE,
        verticalOrigin: VerticalOrigin.BOTTOM,
        pixelOffset: new Cartesian2(0, -28),
      };
    });
  };

  const openInfobox = (entity) => {
    let id = entity.id.id;
    let collection = entity.id.entityCollection.values.map((item) => item.id);
    let index = collection.indexOf(id);
    const feature = props.data.geoJson.features[index];
    const distance = props.data.distances[index];
    props.openInfobox({ feature, index, distance });
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
        opacity={props.opacity}
      />
    </>
  );
}
