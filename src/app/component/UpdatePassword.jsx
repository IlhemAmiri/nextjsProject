import React, { useState } from 'react';

const UpdatePassword = ({ handlePasswordUpdate, error }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert('New passwords do not match');
            return;
        }
        handlePasswordUpdate(oldPassword, newPassword);
    };

    return (
        <div className="flex justify-center py-12 bg-gray-100">
        <div className="w-full max-w-7xl flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 pl-[2.5%]">
          <div className="bg-white shadow-md rounded-md p-6 w-full">
            <h2 className="text-2xl font-semibold mb-4">Update Password</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                <div>
                  <label htmlFor="oldPassword" className="block font-medium mb-2">Old Password</label>
                  <input
                    type="password"
                    id="oldPassword"
                    className="w-full border rounded px-3 py-2"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  
                  />
                </div>
                <div>
                  <label htmlFor="newPassword" className="block font-medium mb-2">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    className="w-full border rounded px-3 py-2"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block font-medium mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="w-full border rounded px-3 py-2"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-[#1ECB15] text-white py-2 px-4 rounded transition-transform hover:scale-105"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

    );
};

export default UpdatePassword;