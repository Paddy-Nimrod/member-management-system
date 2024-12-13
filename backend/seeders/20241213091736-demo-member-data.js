module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Members", [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phoneNumber: "123-456-7890",
        address: "123 Main Street, Springfield",
        dateOfBirth: new Date(1990, 5, 15), // June 15, 1990
        membershipStartDate: new Date(2023, 0, 1), // January 1, 2023
        MembershipEndDate: new Date(2024, 0, 1), // January 1, 2024
        // membershipStatus: "Active",
        profilePicture: "https://example.com/profiles/john_doe.jpg",
        notes: "Long-standing member with excellent engagement.",
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        phoneNumber: "987-654-3210",
        address: "456 Oak Avenue, Metropolis",
        dateOfBirth: new Date(1985, 11, 25), // December 25, 1985
        membershipStartDate: new Date(2022, 5, 15), // June 15, 2022
        MembershipEndDate: new Date(2023, 5, 15), // June 15, 2023
        // membershipStatus: "Inactive",
        profilePicture: "https://example.com/profiles/jane_smith.jpg",
        notes: "Recently moved out of the area.",
      },
      {
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice.johnson@example.com",
        phoneNumber: "555-123-4567",
        address: "789 Pine Lane, Gotham",
        dateOfBirth: new Date(1995, 2, 10), // March 10, 1995
        membershipStartDate: new Date(2023, 6, 1), // July 1, 2023
        MembershipEndDate: new Date(2025, 6, 1), // July 1, 2025
        // membershipStatus: "Active",
        profilePicture: "https://example.com/profiles/alice_johnson.jpg",
        notes: "Highly active in community events.",
      },
      {
        firstName: "Bob",
        lastName: "Williams",
        email: "bob.williams@example.com",
        phoneNumber: "123-888-7777",
        address: "321 Elm Street, Star City",
        dateOfBirth: new Date(1982, 7, 20), // August 20, 1982
        membershipStartDate: new Date(2023, 3, 15), // April 15, 2023
        MembershipEndDate: new Date(2024, 3, 15), // April 15, 2024
        // membershipStatus: "Suspended",
        // profilePicture: "https://example.com/profiles/bob_williams.jpg",
        notes: "Membership temporarily suspended due to overdue fees.",
      },
      {
        firstName: "Charlie",
        lastName: "Brown",
        email: "charlie.brown@example.com",
        phoneNumber: "999-444-1111",
        address: "654 Birch Boulevard, Smallville",
        dateOfBirth: new Date(1978, 3, 5), // April 5, 1978
        membershipStartDate: new Date(2021, 0, 10), // January 10, 2021
        MembershipEndDate: new Date(2023, 0, 10), // January 10, 2023
        // membershipStatus: "Inactive",
        profilePicture: "https://example.com/profiles/charlie_brown.jpg",
        notes: "Former member with a history of active participation.",
      },
      // Add more entries as needed, following the same pattern
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Delete all members if the seed needs to be rolled back
    await queryInterface.bulkDelete("Members", null, {});
  },
};
