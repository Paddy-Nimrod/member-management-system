import React, { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";

export default function ListMemberPage() {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("/api/members/all", {
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
        setMembers(data.members);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="w-10 m-auto">
          <Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="three-dots-loading"
            wrapperStyle
            wrapperClass
            className="m-auto"
          />
        </div>
      ) : (
        <div className="w-9/12 m-auto p-4">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">First Name</th>
                <th className="border border-gray-300 px-4 py-2">Last Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">
                  Phone Number
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {members ? (
                members.map((member) => (
                  <tr key={member.id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {member.id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {member.firstName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {member.lastName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {member.email}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {member.phoneNumber}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <a>view</a>
                    </td>
                  </tr>
                ))
              ) : (
                <p>No members found.</p>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
