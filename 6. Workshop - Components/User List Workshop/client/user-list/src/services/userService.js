const baseUrl = "http://localhost:3005/api/users";

// Getting all the users from the server via Fetch API
export const getAllUsers = async () => {
  const response = await fetch(baseUrl);
  const result = await response.json();
  return result.users;
};

export const getUser = async (userId) => {
  const response = await fetch(`${baseUrl}/${userId}`);
  const result = await response.json();
  return result.user;
};

export const createUser = async (userData) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(userData)
  });

  const result = await response.json();
  return result.user;
}

export const deleteUser = (userId) => {
  fetch(`${baseUrl}/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
    });
};
