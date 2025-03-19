import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContextProvider";
import { useParams } from "react-router-dom";
import QuestionById from "../components/QuestionById";
import { Answers } from "../components/Answers";
import { AnswerQuestion } from "../components/AnswerQuestion";

function ClickedQuestionsPage() {
  // Accessing global context to get loading state and fetchData function
  const { isLoading, fetchData } = useContext(GlobalContext);

  // Extracting the 'id' parameter from the URL using useParams hook
  const { id } = useParams();

  const [thread, setThread] = useState("");

  // useEffect hook to fetch thread data when the component mounts or 'id' changes
  useEffect(() => {
    // Calling fetchData with the specified endpoint and id
    fetchData({
      endpoint: "/api/threads/",
      id: id,
      errMsg: "Error fetching thread",
    }).then((data) => setThread(data)); // Updating state with fetched data
  }, [id]); // Dependency array to re-run effect when 'id' changes

  return (
    <>
      {isLoading && <p>Loading...</p>}

      {!isLoading && (
        <>
          <QuestionById thread={thread} />
          <Answers id={id} />
          <AnswerQuestion id={id} />
        </>
      )}
    </>
  );
}

export default ClickedQuestionsPage;
