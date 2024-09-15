// src/components/FormPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const FormPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize formData with passed state or default values
  const initialFormData = location.state?.formData || {
    propertyName: '',
    locationCity: '',
    locationCountry: '',
    peopleCount: '',
    bedroomCount: '',
    bathroomCount: '',
    pricePerNight: '',
    view: '',
    propertyType: '',
    description: '',
    extraServices: [],
    images: []
  };

  const [formData, setFormData] = useState(initialFormData);

  // Update formData if state is passed from navigation
  useEffect(() => {
    if (location.state?.formData) {
      setFormData(location.state.formData);
    }
  }, [location.state]);

  // Handler for text, number, and select inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handler for checkbox inputs (Extra Services)
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      extraServices: checked
        ? [...prevState.extraServices, value]
        : prevState.extraServices.filter(service => service !== value)
    }));
  };

  // Handler for image uploads
  const handleImageChange = (e) => {
    if (e.target.files.length > 3) {
      alert("You can only upload up to 3 images.");
      return;
    }
    setFormData({ ...formData, images: Array.from(e.target.files) });
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/summary', { state: { formData } });
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl space-y-6 border border-gray-300 rounded-2xl shadow-md p-6 bg-white"
      >
        <h1 className='text-gray-700 font-bold text-center text-3xl uppercase'>Property Details</h1>

        {/* Property Name */}
        <div>
          <label className="block font-bold mb-1">Property Name</label>
          <input
            type="text"
            name="propertyName"
            value={formData.propertyName}
            onChange={handleChange}
            className="border border-gray-400 rounded p-2 w-full"
            required
          />
        </div>

        {/* Location */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block font-bold mb-1">City</label>
            <input
              type="text"
              name="locationCity"
              value={formData.locationCity}
              onChange={handleChange}
              className="border border-gray-400 rounded p-2 w-full"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block font-bold mb-1">Country</label>
            <input
              type="text"
              name="locationCountry"
              value={formData.locationCountry}
              onChange={handleChange}
              className="border border-gray-400 rounded p-2 w-full"
              required
            />
          </div>
        </div>

        {/* People Count, Bedroom Count, Bathroom Count */}
        <div className="flex gap-4">
          <div className="w-1/3">
            <label className="block font-bold mb-1">People Count</label>
            <input
              type="number"
              name="peopleCount"
              value={formData.peopleCount}
              onChange={handleChange}
              className="border border-gray-400 rounded p-2 w-full"
              required
              min="1"
            />
          </div>
          <div className="w-1/3">
            <label className="block font-bold mb-1">Bedroom Count</label>
            <input
              type="number"
              name="bedroomCount"
              value={formData.bedroomCount}
              onChange={handleChange}
              className="border border-gray-400 rounded p-2 w-full"
              required
              min="0"
            />
          </div>
          <div className="w-1/3">
            <label className="block font-bold mb-1">Bathroom Count</label>
            <input
              type="number"
              name="bathroomCount"
              value={formData.bathroomCount}
              onChange={handleChange}
              className="border border-gray-400 rounded p-2 w-full"
              required
              min="0"
            />
          </div>
        </div>

        {/* Price Per Night */}
        <div>
          <label className="block font-bold mb-1">Price Per Night ($)</label>
          <input
            type="number"
            name="pricePerNight"
            value={formData.pricePerNight}
            onChange={handleChange}
            className="border border-gray-400 rounded p-2 w-full"
            required
            min="0"
            step="0.01"
          />
        </div>

        {/* View */}
        <div>
          <label className="block font-bold mb-1">Select View</label>
          <select
            name="view"
            value={formData.view}
            onChange={handleChange}
            className="border border-gray-400 rounded p-2 w-full"
            required
          >
            <option value="">Select View</option>
            <option value="Sea">Sea</option>
            <option value="Mountain">Mountain</option>
            <option value="City">City</option>
          </select>
        </div>

        {/* Property Type */}
        <div>
          <label className="block font-bold mb-1">Property Type</label>
          <input
            type="text"
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            className="border border-gray-400 rounded p-2 w-full"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-bold mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-400 rounded p-2 w-full"
            rows="5"
            required
          ></textarea>
        </div>

        {/* Images */}
        <div>
          <label className="block font-bold mb-1">Property Images (up to 3)</label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="border border-gray-400 rounded p-2 w-full"
          />
          {formData.images.length > 0 && (
            <div className="mt-2">
              <p className="font-bold mb-1">Preview:</p>
              <div className="flex gap-2">
                {formData.images.slice(0, 3).map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                    className="w-24 h-24 object-cover border border-gray-300 rounded"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Extra Services */}
        <div className="bg-gray-100 p-4 rounded">
          <label className="block font-bold mb-2">Extra Services</label>
          <div className="flex flex-col gap-2">
            {['Free WiFi', 'Free Cold Air Conditioning', 'Air Conditioning', 'Free Room Cleaning'].map(service => (
              <label key={service} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={service}
                  checked={formData.extraServices.includes(service)}
                  onChange={handleCheckboxChange}
                />
                {service}
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-2xl w-3/4"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormPage;
