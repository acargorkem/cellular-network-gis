import { useState, useEffect } from 'react';
import { Entity, PolygonGraphics } from 'resium';
import { Color } from 'cesium';
import { getCoverageAreaBoundsForFeatures } from '../../services/coverageArea';

export default function CoverageArea(props) {
  const [boundsStrongest, setBoundsStrongest] = useState([]);
  const [boundsMedium, setBoundsMedium] = useState([]);
  const [boundsWeakest, setBoundsWeakest] = useState([]);

  useEffect(() => {
    if (props.distances.length == 0) {
      return;
    }
    const setCoverageAreaBounds = (features, distances) => {
      let distancesStrongest = distances;
      let distancesMedium = distances.map((distance) => distance * 1.5);
      let distancesWeakest = distances.map((distance) => distance * 2);
      setBoundsStrongest(getBounds(features, distancesStrongest));
      setBoundsMedium(getBounds(features, distancesMedium));
      setBoundsWeakest(getBounds(features, distancesWeakest));
    };

    const features = [...props.features];
    const distances = [...props.distances];
    setCoverageAreaBounds(features, distances);
  }, [props]);

  const getBounds = (features, distances) => {
    let points = getCoverageAreaBoundsForFeatures(features, distances);
    return points;
  };

  const polygonOptions = {
    strongest: {
      name: '-65 dBm',
      material: Color.fromCssColorString('#70be2d').withAlpha(0.5),
      zIndex: 3,
    },
    medium: {
      name: '-80 dBm',
      material: Color.fromCssColorString('#ffe300').withAlpha(0.5),
      zIndex: 2,
    },
    weakest: {
      name: '-100 dBm',
      material: Color.fromCssColorString('#ff380f').withAlpha(0.5),
      zIndex: 1,
    },
  };

  const renderPolygon = (bounds, { name, material, zIndex }) => {
    return bounds.map((coverageArea, index) => {
      return (
        <Entity key={index} name={name}>
          <PolygonGraphics
            zIndex={zIndex}
            hierarchy={coverageArea}
            material={material}
          />
        </Entity>
      );
    });
  };

  return (
    <>
      {renderPolygon(boundsStrongest, polygonOptions.strongest)}
      {renderPolygon(boundsMedium, polygonOptions.medium)}
      {renderPolygon(boundsWeakest, polygonOptions.weakest)}
    </>
  );
}
