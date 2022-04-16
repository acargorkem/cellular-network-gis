const AdmZip = require('adm-zip');

const unzip = (zipFileBuffer) => {
  try {
    const zip = new AdmZip(zipFileBuffer);
    const entries = zip.getEntries();
    const kmlEntry = entries.find((entry) => entry.entryName.endsWith('.kml'));
    return kmlEntry.getData().toString('utf-8');
  } catch (e) {
    return null;
  }
};

const selectPointFeatures = (feature) => {
  return feature.geometry.type === 'Point';
};

const getDistances = (features) => {
  if (!features) {
    return null;
  }
  return features.map((feature) => {
    if (feature.properties.distances) {
      return feature.properties.distances;
    }
    return {
      top: 300,
      left: 300,
      right: 300,
    };
  });
};

module.exports = {
  unzip,
  selectPointFeatures,
  getDistances,
};
