import { useState, useEffect } from 'react';
import { Entity, PolygonGraphics } from 'resium';
import { Color } from 'cesium';
import { getCoverageAreaBoundsForFeatures } from '../../services/coverageArea';

export default function CoverageArea(props) {
  const [boundsStrongest, setBoundsStrongest] = useState([]);
  const [boundsMedium, setBoundsMedium] = useState([]);
  const [boundsWeakest, setBoundsWeakest] = useState([]);
  const [opacity, setOpacity] = useState(0.5);

  useEffect(() => {
    if (props.opacity >= 0) {
      setOpacity(props.opacity);
    }
    if (props.distances.length == 0) {
      return;
    }
    const setCoverageAreaBounds = (features, distances) => {
      let distancesStrongest = distances;
      let distancesMedium = distances.map((distance) => {
        return multiplyDistance(distance, 1.5);
      });
      let distancesWeakest = distances.map((distance) => {
        return multiplyDistance(distance, 2);
      });
      console.log(distancesStrongest);
      console.log(distancesMedium);
      console.log(distancesWeakest);
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

  const multiplyDistance = ({ top, right, left }, multiplier) => {
    return {
      top: top * multiplier,
      right: right * multiplier,
      left: left * multiplier,
    };
  };

  const polygonOptions = {
    strongest: {
      name: '-65 dBm',
      material: Color.fromCssColorString('rgb(0, 255, 0)').withAlpha(opacity),
      zIndex: 3,
    },
    medium: {
      name: '-80 dBm',
      material: Color.fromCssColorString('rgb(255, 227, 0)').withAlpha(opacity),
      zIndex: 2,
    },
    weakest: {
      name: '-100 dBm',
      material: Color.fromCssColorString('rgb(255, 0, 0)').withAlpha(opacity),
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
