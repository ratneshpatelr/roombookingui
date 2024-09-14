// src/components/SummaryPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const SummaryPage = () => {
  const { state } = useLocation();
  const { formData } = state;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Property Summary</h1>
      
      {/* Images Section */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex flex-wrap justify-center space-x-4 overflow-x-auto">
          {formData.images && formData.images.length > 0 && (
            formData.images.slice(0, 3).map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt="Property"
                className="w-full md:w-48 h-48 object-cover rounded-lg shadow-md mb-4"
              />
            ))
          )}
        </div>
      </div>
      <div><h2 className="text-3xl uppercase text-center font-semibold text-gray-800 mb-4">{formData.propertyName}</h2>
      </div>
      {/* Property and Price Details Section */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Property Details */}
        <div className="shadow-md rounded-lg p-6">
          <p className="text-gray-600 mb-2">{formData.locationCity}, {formData.locationCountry}</p>
          <p className="text-gray-600 mb-2">People: {formData.peopleCount}</p>
          <p className="text-gray-600 mb-2">Bedrooms: {formData.bedroomCount}</p>
          <p className="text-gray-600 mb-2">Bathrooms: {formData.bathroomCount}</p>
        </div>

        {/* Price Details */}
        <div className="bg-gray-100 shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Price Per Night</h3>
          <div className="space-y-4 mb-4">
            <div className="flex justify-between text-gray-600">
              <span>Price per Night:</span>
              <span>${formData.pricePerNight}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Check-in Date:</span>
              <span><input type="date" /></span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Check-out Date:</span>
              <span><input type="date" /></span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Taxes:</span>
              <span>($XX.XX)</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Service Fee:</span>
              <span>($XX.XX)</span>
            </div>
          </div>
          <button className="bg-blue-500 text-white p-2 rounded-lg w-full mt-4">
            Confirm Booking
          </button>
        </div>
      </div>
      
      {/* Description Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Description</h3>
        <p className="text-gray-600">{formData.description}</p>
      </div>
      
      {/* Extra Services Section */}
      <div className="max-w-4xl mx-auto bg-gray-100 shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Extra Services</h3>
        <p className="text-gray-600">{formData.extraServices.join(', ')}</p>
      </div>
    </div>
  );
};

export default SummaryPage;
