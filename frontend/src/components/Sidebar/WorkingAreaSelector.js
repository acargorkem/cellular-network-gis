export default function WorkingAreaSelector() {
  const workingAreas = [
    {
      name: 'Dense urban',
      distance: 500,
    },
    {
      name: 'Urban',
      distance: 750,
    },
    {
      name: 'Sub urban',
      distance: 1000,
    },
    {
      name: 'Rural',
      distance: 2000,
    },
    {
      name: 'Village',
      distance: 4000,
    },
  ];

  return (
    <div className="selector-working-area">
      <label className="selector-label">
        Base station working area
        <select>
          {workingAreas.map((area, index) => {
            return (
              <option key={index} value={area.distance}>
                {area.name}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
}
