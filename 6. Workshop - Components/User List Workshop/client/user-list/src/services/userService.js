const baseUrl = "http://localhost:3005/api/users";

// Getting all the users from the server via Fetch API
export const getAllUsers = async () => {
  const response = await fetch(baseUrl);
  const result = await response.json();
  return result.users;
};