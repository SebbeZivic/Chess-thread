import { createContext, useState } from "react";

const BASE_URL = "http://localhost:3000";

export const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
  // State to track loading status
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async ({
    //Get data from API
    endpoint,
    id = "",
    method = "GET",
    body = null,
    headers = { "Content-Type": "application/json" }, //Requests headers
    errMsg = "Failed to fetch data",
  }) => {
    try {
      setIsLoading(true);

      // Construct the full URL
      const url = new URL(`${BASE_URL}${endpoint}${id}`);

      // Create the request options
      const options = {
        method,
        headers,
        ...(body && { body: JSON.stringify(body) }), // Spread body and make it a stringify
      };

      // Send the request
      const response = await fetch(url, options);

      if (!response.ok) throw new Error(errMsg);

      // Parse and return the JSON response
      return await response.json();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const pushToDatabase = async (endpointUrl, bodyContent, failed) => {
    fetchData({
      endpoint: endpointUrl,
      method: "POST",
      body: bodyContent,
      errMsg: `Failed to post ${failed}`,
    })
      .then((data) => {
        if (data) {
          alert(data.message); // Show success message
        } else {
          alert("An unexpected error occurred."); // Show generic error
        }
      })
      .catch((error) => alert(error.message)); // Handle errors
  };

  // Define the values that will be available to all components using this context
  const values = {
    BASE_URL,
    fetchData,
    isLoading,
    pushToDatabase,
  };

  return (
    // Provide the values to the entire application
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
}
