import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAPIKey } from "@/store/chatSlice";

import React from "react";

export function ChangeAPIKey({ setChangeApiKey }: { setChangeApiKey: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [tempApiKey, setTempApiKey] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempApiKey(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(setAPIKey(tempApiKey));
    setChangeApiKey(false);
  };
  const handleUseDefaultKey = () => {
    dispatch(setAPIKey(""));
    setChangeApiKey(false);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
        Enter Your API Key
      </h2>
      <div className="mb-4">
        <label
          htmlFor="apiKey"
          className="block text-sm font-medium text-gray-600 mb-2"
        >
          API Key
        </label>
        <input
          id="apiKey"
          type="text"
          value={tempApiKey}
          onChange={handleInputChange}
          placeholder="Enter your API key"
          className="w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
          </div>
          <div className="flex gap-4">
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="w-full py-3 px-4 bg-blue-500 font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Save API Key
        </button>
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleUseDefaultKey}
          className="w-full py-3 px-4 bg-blue-500 font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Use Default Key
        </button>
              </div>
              </div>
    </div>
  );
}
