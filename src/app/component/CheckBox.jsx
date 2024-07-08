import React from 'react';

const CheckBox = ({
  searchParams,
  handleVehicleTypeChange,
  handleBodyTypeChange,
  handleSeatsChange,
  priceRange,
  handlePriceRangeChange,
}) => {
  return (
    <div className="w-full lg:w-[336px] h-auto mb-8 lg:mb-0 lg:mr-12">
    <div className="bg-white p-6 rounded shadow-[3px_3px_9px_0px_#A4A4BA33] mb-6">
      <h3 className="font-semibold">Vehicle Type</h3>
      <div className="flex flex-col gap-2 mt-2">
        <label><input type="checkbox" name="vehicleType" value="Car" checked={searchParams.vehicleType === 'Car'} onChange={handleVehicleTypeChange} /> Car</label>
        <label><input type="checkbox" name="vehicleType" value="Van" checked={searchParams.vehicleType === 'Van'} onChange={handleVehicleTypeChange} /> Van</label>
        <label><input type="checkbox" name="vehicleType" value="Minibus" checked={searchParams.vehicleType === 'Minibus'} onChange={handleVehicleTypeChange} /> Minibus</label>
        <label><input type="checkbox" name="vehicleType" value="Prestige" checked={searchParams.vehicleType === 'Prestige'} onChange={handleVehicleTypeChange} /> Prestige</label>

      </div>
    </div>
    <div className="bg-white p-6 border-t rounded shadow-[3px_3px_9px_0px_#A4A4BA33] mb-6">
      <h3 className="font-semibold">Car Body Type</h3>
      <div className="flex flex-col gap-2 mt-2">
        <label><input type="checkbox" name="bodyType" value="Compact" checked={searchParams.bodyType === 'Compact'} onChange={handleBodyTypeChange} /> Compact</label>
        <label><input type="checkbox" name="bodyType" value="Convertible" checked={searchParams.bodyType === 'Convertible'} onChange={handleBodyTypeChange} /> Convertible</label>
        <label><input type="checkbox" name="bodyType" value="Coupe" checked={searchParams.bodyType === 'Coupe'} onChange={handleBodyTypeChange} /> Coupe</label>
        <label><input type="checkbox" name="bodyType" value="Exotic Cars" checked={searchParams.bodyType === 'Exotic Cars'} onChange={handleBodyTypeChange} /> Exotic Cars</label>
        <label><input type="checkbox" name="bodyType" value="Hatchback" checked={searchParams.bodyType === 'Hatchback'} onChange={handleBodyTypeChange} /> Hatchback</label>
        <label><input type="checkbox" name="bodyType" value="Minivan" checked={searchParams.bodyType === 'Minivan'} onChange={handleBodyTypeChange} /> Minivan</label>
        <label><input type="checkbox" name="bodyType" value="Truck" checked={searchParams.bodyType === 'Truck'} onChange={handleBodyTypeChange} /> Truck</label>
        <label><input type="checkbox" name="bodyType" value="Sedan" checked={searchParams.bodyType === 'Sedan'} onChange={handleBodyTypeChange} /> Sedan</label>
        <label><input type="checkbox" name="bodyType" value="Sports Car" checked={searchParams.bodyType === 'Sports Car'} onChange={handleBodyTypeChange} /> Sports Car</label>
        <label><input type="checkbox" name="bodyType" value="Station Wagon" checked={searchParams.bodyType === 'Station Wagon'} onChange={handleBodyTypeChange} /> Station Wagon</label>
        <label><input type="checkbox" name="bodyType" value="SUV" checked={searchParams.bodyType === 'SUV'} onChange={handleBodyTypeChange} /> SUV</label>

      </div>
    </div>
    <div className="bg-white p-6 border-t rounded shadow-[3px_3px_9px_0px_#A4A4BA33] mb-6">
      <h3 className="font-semibold">Number of Seats</h3>
      <div className="flex flex-col gap-2 mt-2">
        <label><input type="checkbox" name="seats" value="2" checked={searchParams.seats === '2'} onChange={handleSeatsChange} /> 2 seats</label>
        <label><input type="checkbox" name="seats" value="4" checked={searchParams.seats === '4'} onChange={handleSeatsChange} /> 4 seats</label>
        <label><input type="checkbox" name="seats" value="5" checked={searchParams.seats === '5'} onChange={handleSeatsChange} /> 5 seats</label>
        <label><input type="checkbox" name="seats" value="6" checked={searchParams.seats === '6'} onChange={handleSeatsChange} /> 6 seats</label>
        <label><input type="checkbox" name="seats" value="7" checked={searchParams.seats === '7'} onChange={handleSeatsChange} /> 7 seats</label>

      </div>
    </div>
    <div className="bg-white p-6 border-t rounded shadow-[3px_3px_9px_0px_#A4A4BA33]">
      <h3 className="font-semibold text-lg mb-2">Price ($)</h3>
      <div className="flex items-center gap-4 mt-2">
        <input
          type="range"
          min="0"
          max="10000"
          value={priceRange}
          onChange={handlePriceRangeChange}
          className="w-full"
        />
        <span className="font-semibold">
          ${priceRange.toLocaleString()} - $10,000
        </span>
      </div>
      <div className="flex justify-between mt-2 text-sm text-gray-500">
        <span>$0</span>
        <span>$10,000</span>
      </div>
    </div>
  </div>
  );
};

export default CheckBox;
