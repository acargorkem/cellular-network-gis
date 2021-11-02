import { Entity, LabelGraphics } from 'resium';
import { HorizontalOrigin, VerticalOrigin, Cartesian2 } from 'cesium';

export default function CesiumTooltip({ text, position }) {
  return (
    <Entity position={position}>
      <LabelGraphics
        showBackground={true}
        font="14px roboto"
        horizontalOrigin={HorizontalOrigin.LEFT}
        verticalOrigin={VerticalOrigin.TOP}
        pixelOffset={new Cartesian2(15, 0)}
        text={text}
      ></LabelGraphics>
    </Entity>
  );
}
