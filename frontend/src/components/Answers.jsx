import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContextProvider";
import { Answer } from "../components/Answer";

export function Answers({ id }) {
  const { isLoading, fetchData } = useContext(GlobalContext);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    fetchData({
      endpoint: "/api/answer/get/",
      id: id,
      errMsg: "Could not retrieve the answers to this question",
    }).then((data) => setAnswers(data || []));
  }, [id]);

  return (
    <div>
      
      {isLoading && <p>Loading...</p>}
      {!isLoading &&
        answers.map((answer) => <Answer data={answer} key={answer.answerId} />)}
    </div>
  );
}
