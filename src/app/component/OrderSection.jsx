import React from 'react';
const OrderSection = ({ title, status, renderOrders }) => (
    <div className="bg-gray-50 p-4 rounded-lg mb-6 text-center">
      <h2 className="font-bold mt-4 text-[20px] p-4 text-center">{title}</h2>
      <div className="table-responsive">
        <div className="lg:table w-full mt-2 mb-4 divide-y divide-gray-300">
          <div className="text-[#ACACAC] text-[15px] hidden lg:table-row">
            <div className="lg:table-cell p-1 font-normal">#</div>
            <div className="lg:table-cell p-1 font-normal">Car Name</div>
            <div className="lg:table-cell p-1 font-normal">Pick Up Location</div>
            <div className="lg:table-cell p-1 font-normal">Drop Off Location</div>
            <div className="lg:table-cell p-1 font-normal">Pick Up Date</div>
            <div className="lg:table-cell p-1 font-normal">Return Date</div>
            <div className="lg:table-cell p-1 font-normal">Total Cost</div>
            <div className="lg:table-cell p-1 font-normal">With Driver</div>
            <div className="lg:table-cell p-1 font-normal">Comment</div>
            <div className="lg:table-cell p-1 font-normal">Status</div>
          </div>
          <div className="lg:table-row-group">
            {renderOrders(status)}
          </div>
        </div>
      </div>
    </div>
  );
  
  export default OrderSection;