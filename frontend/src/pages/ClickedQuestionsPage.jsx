import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContextProvider";
import { useParams } from "react-router-dom";
import QuestionById from "../components/QuestionById";
import { Answers } from "../components/Answers";
import { AnswerQuestion } from "../components/AnswerQuestion";

function ClickedQuestionsPage() {
  const { isLoading, fetchData } = useContext(GlobalContext);
  const { id } = useParams();
  const [thread, setThread] = useState("");
  useEffect(() => {
    fetchData({
      endpoint: "/api/threads/",
      id: id,
      errMsg: "Error fetching thread",
    }).then((data) => setThread(data));
  }, [id]);

  return (
    <>
      {isLoading && <p>Loading...</p>}

      {!isLoading && (
        <>
          <QuestionById thread={thread}/>
          <Answers id={id} />
          <AnswerQuestion id={id} />
        </>
      )}
    </>
  );
}

export default ClickedQuestionsPage;
