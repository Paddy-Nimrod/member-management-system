import React, { useState, useEffect } from "react";
import { resolvePath, useParams } from "react-router";

export default function MemberProfilePage() {
  const [member, setMember] = useState([]);
  let params = useParams();
  const member_id = params.member_id;

  useEffect(() => {
    console.log(member_id);
    const member_details = async () => {
      try {
        const response = await fetch(`/api/members/${member_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch members");
        }

        const data = await response.json();
        console.log(data);
        setMember(data);
      } catch (error) {
        console.error("Could not fetch member details", error);
      }
    };
    if (member_id) {
      member_details();
    }
  }, [member_id]);

  return (
    <div className="w-full m-auto flex gap-2 p-4">
      <div className="flex justify-center items-center w-1/4 border-2 rounded-sm border-slate-950">
        {member.profilePicture ? (
          <img
            src={member.profilePicture}
            alt={`${member.firstName} ${member.lastName}'s Profile`}
            className="w-full h-full"
          />
        ) : (
          <div className="w-48 h-48 rounded-sm bg-gray-300 flex items-center justify-center text-white">
            No Picture
          </div>
        )}
      </div>
      <form className="grid grid-cols-3 gap-3 w-3/4 m-2" encType="multipart/form-data">
        <div className="flex flex-col w-full mt-2">
          <label className="font-medium text-gray-500">First Name:</label>
          <input
            className="border p-2 w-full text-gray-700 active:outline-2 focus:outline-none focus:shadow-outline h-10 rounded-md"
            type="text"
            name="firstName"
            value={member.firstName} 
            disabled
          />
        </div>

        <div className="flex flex-col w-full mt-2">
          <label className="font-medium text-gray-500">Last Name:</label>
          <input
            className="border p-2 w-full text-gray-700 active:outline-2 focus:outline-none focus:shadow-outline h-10 rounded-md"
            type="text"
            name="lastName"
            value={member.lastName}
            disabled
          />
        </div>

        <div>
          <label className="font-medium text-gray-500">Email:</label>
          <input
            className="border p-2 w-full text-gray-700 active:outline-2 focus:outline-none focus:shadow-outline h-10 rounded-md"
            type="email"
            name="email"
            value={member.email}
            disabled
          />
        </div>

        <div>
          <label className="font-medium text-gray-500">Phone Number:</label>
          <input
            className="border p-2 w-full text-gray-700 active:outline-2 focus:outline-none focus:shadow-outline h-10 rounded-md"
            type="text"
            name="phoneNumber"
            value={member.phoneNumber}
            disabled
          />
        </div>

        <div>
          <label className="font-medium text-gray-500">Address:</label>
          <input
            className="border p-2 w-full text-gray-700 active:outline-2 focus:outline-none focus:shadow-outline h-10 rounded-md"
            type="text"
            name="address"
            value={member.address}
            disabled
          />
        </div>

        <div>
          <label className="font-medium text-gray-500">Date of Birth:</label>
          <input
            className="border p-2 w-full text-gray-700 active:outline-2 focus:outline-none focus:shadow-outline h-10 rounded-md"
            type="date"
            name="dateOfBirth"
            value={member.dateOfBirth}
            disabled
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
            value={member.membershipStartDate}
            disabled
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
            value={member.MembershipEndDate}
            disabled
          />
        </div>

        <div>
          <label className="font-medium text-gray-500">
            Membership Status:
          </label>
          <input
            name="membershipStatus"
            value={member.membershipStatus}
            disabled
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="font-medium text-gray-500">Notes:</label>
          <textarea
            className="border p-2 w-full text-gray-700 active:outline-2 focus:outline-none focus:shadow-outline h-10 rounded-md"
            name="notes"
            value={member.notes}
            disabled
          />
        </div>

        <div>
          <button
            className="bg-slate-800 hover:bg-slate-700 outline-none hover:outline-none font-semibold mt-4 text-white h-10 w-1/2 float-right rounded-md"
            type="submit"
          >
            Update Details
          </button>
        </div>
      </form>
    </div>
  );
}
