import React, { useState } from "react";

const AddMemberForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
    membershipStartDate: "",
    membershipEndDate: "",
    membershipStatus: "Active",
    profilePicture: null,
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formDataToSubmit = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "profilePicture" && formData[key]) {
          formDataToSubmit.append(key, formData[key]);
        } else {
          formDataToSubmit.append(key, formData[key]);
        }
      });

      for (let [key, value] of formDataToSubmit.entries()) {
        console.log(`${key}: ${value}`);
      }

      const authToken = sessionStorage.getItem("authToken");
      const headers = new Headers();
      if (authToken) {
        headers.append("Authorization", `Bearer ${authToken}`);
      }
      const response = await fetch("/api/members/create", {
        method: "POST",
        headers: headers,
        body: formDataToSubmit,
      });

      if (!response.ok) {
        throw new Error("failed to create member");
      }
      const result = await response.json();
      console.log("member created", result);

      setSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        dateOfBirth: "",
        membershipStartDate: "",
        membershipEndDate: "",
        membershipStatus: "Active",
        profilePicture: null,
        notes: "",
      });
    } catch (error) {
      setError("An error occurred while adding the member.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

    return (
      <>
        <div className="flex flex-col w-10/12 m-auto">
          <div className="my-3">
            <p className="text-gray-900 capitalize font-semibold">
              Add New Member
            </p>
          </div>
          <div className="w-full m-auto">
            <div>
              {loading && <p>Submitting...</p>}
              {error && <p style={{ color: "red" }}>{error}</p>}
              {success && (
                <p style={{ color: "green" }}>Member added successfully!</p>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-3 gap-3"
              encType="multipart/form-data"
            >
              <div className="flex flex-col w-full mt-2">
                <label className="font-medium text-gray-500">First Name:</label>
                <input
                  className="border p-2 w-full text-gray-700 active:outline-2 focus:outline-none focus:shadow-outline h-10 rounded-md"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col w-full mt-2">
                <label className="font-medium text-gray-500">Last Name:</label>
                <input
                  className="border p-2 w-full text-gray-700 active:outline-2 focus:outline-none focus:shadow-outline h-10 rounded-md"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="font-medium text-gray-500">Email:</label>
                <input
                  className="border p-2 w-full text-gray-700 active:outline-2 focus:outline-none focus:shadow-outline h-10 rounded-md"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="font-medium text-gray-500">
                  Phone Number:
                </label>
                <input
                  className="border p-2 w-full text-gray-700 active:outline-2 focus:outline-none focus:shadow-outline h-10 rounded-md"
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="font-medium text-gray-500">Address:</label>
                <input
                  className="border p-2 w-full text-gray-700 active:outline-2 focus:outline-none focus:shadow-outline h-10 rounded-md"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="font-medium text-gray-500">
                  Date of Birth:
                </label>
                <input
                  className="border p-2 w-full text-gray-700 active:outline-2 focus:outline-none focus:shadow-outline h-10 rounded-md"
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="font-medium text-gray-500">
                  Membership Start Date:
                </label>
                <input
                  className="border p-2 w-full text-gray-700 active:outline-2 focus:outline-none focus:shadow-outline h-10 rounded-md"
                  type="date"
                  name="membershipStartDate"
                  value={formData.membershipStartDate}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="font-medium text-gray-500">
                  Membership End Date:
                </label>
                <input
                  className="border p-2 w-full text-gray-700 active:outline-2 focus:outline-none focus:shadow-outline h-10 rounded-md"
                  type="date"
                  name="MembershipEndDate"
                  value={formData.MembershipEndDate}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="font-medium text-gray-500">
                  Membership Status:
                </label>
                <select
                  name="membershipStatus"
                  value={formData.membershipStatus}
                  onChange={handleChange}
                  className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>

              <div>
                <label className="font-medium text-gray-500">
                  Profile Picture Upload:
                </label>
                <input
                  className="border p-2 w-full text-gray-700 active:outline-2 focus:outline-none focus:shadow-outline h-10 rounded-md"
                  type="file"
                  name="profilePicture"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>

              <div>
                <label className="font-medium text-gray-500">Notes:</label>
                <textarea
                  className="border p-2 w-full text-gray-700 active:outline-2 focus:outline-none focus:shadow-outline h-10 rounded-md"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>

              <div>
                <button
                  className="bg-slate-800 hover:bg-slate-700 outline-none hover:outline-none font-semibold mt-4 text-white h-10 w-1/2 float-right rounded-md"
                  type="submit"
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
};

export default AddMemberForm;
