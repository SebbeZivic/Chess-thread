import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContextProvider";
import { Answer } from "../components/Answer";

// This component fetches and displays answers for a specific question
export function Answers({ id }) {
  const { isLoading, fetchData } = useContext(GlobalContext);

  // State to store the list of answers
  const [answers, setAnswers] = useState([]);

  // useEffect runs when the component loads or when 'id' changes
  useEffect(() => {
    // Fetch answers from the API using the provided question ID
    fetchData({
      endpoint: `/api/answer/get/`,
      id: id,
      errMsg: "Could not retrieve the answers to this question",
    }).then((data) => setAnswers(data || [])); // Store the retrieved answers in state
  }, [id]); // Runs again if 'id' changes

  return (
    <div>
      {/* Show a loading message while data is being fetched */}
      {isLoading && <p>Loading...</p>}

      {/* Display the list of answers once loading is complete */}
      {!isLoading &&
        answers.map((answer) => <Answer data={answer} key={answer.answerId} />)}
    </div>
  );
}

/*mappar allt vi får, array med objekt*/
