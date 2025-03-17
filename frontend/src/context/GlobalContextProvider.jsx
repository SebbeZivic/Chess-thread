import { createContext, useState } from "react";

const BASE_URL = "http://localhost:3000";

export const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async ({
    endpoint,
    id = "",
    method = "GET",
    body = null,
    headers = { "Content-Type": "application/json" },
    errMsg = "Failed to fetch data",
  }) => {
    try {
      setIsLoading(true);

      const url = new URL(`${BASE_URL}${endpoint}${id}`);

      const options = {
        method,
        headers,
        ...(body && { body: JSON.stringify(body) }),
      };

      const response = await fetch(url, options);
      if (!response.ok) throw new Error(errMsg);

      return await response.json();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Nedanför, template som vi kan kalla på i questionform

  const pushToDatabase = async (endpointUrl, bodyContent, failed) => {
    fetchData({
      endpoint: endpointUrl,
      method: "POST",
      body: bodyContent,
      errMsg: `Failed to post ${failed}`,
    })
      .then((data) => {
        if (data) {
          alert(data.message);
        } else {
          alert("An unexpected error occurred.");
        }
      })
      .catch((error) => alert(error.message));
  };

  const values = {
    BASE_URL,
    fetchData,
    isLoading,
    pushToDatabase,
  };

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
}
