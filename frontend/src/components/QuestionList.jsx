import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContextProvider";
import Question from "./Question";

export function QuestionList() {
  const { isLoading, fetchData } = useContext(GlobalContext);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchData({
      endpoint: "/api/threads/",
      errMsg: "failed to get threads",
    }).then((data) => setQuestions(data || []));
  }, []);

  return (
    <>
      {isLoading && <p>Loading...</p>}

      {!isLoading &&
        questions.map((question) => (
          <Question data={question} key={question.threadId} />
        ))}
    </>
  );
}
