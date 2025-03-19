import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContextProvider";
import Question from "./Question";

export function QuestionList() {
  const { isLoading, fetchData } = useContext(GlobalContext);

  // State to store the list of questions
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Fetches question data from the backend when the component mounts
    fetchData({
      endpoint: "/api/threads/", // API endpoint for fetching threads
      errMsg: "Failed to get threads",
    }).then((data) => setQuestions(data || [])); // Store data in state, or set an empty array if null
  }, []); // Empty dependency array means this runs only once when the component loads

  return (
    <>
      {/* Show loading message while data is being fetched */}
      {isLoading && <p>Loading...</p>}

      {/* Once data is loaded, map through the list of questions and display them */}
      {!isLoading &&
        questions.map((question) => (
          <Question data={question} key={question.threadId} />
        ))}
    </>
  );
}
