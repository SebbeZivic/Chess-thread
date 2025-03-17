import { useContext, useRef } from "react";
import { GlobalContext } from "../context/GlobalContextProvider";

export function AnswerQuestion({ id }) {
  const { pushToDatabase } = useContext(GlobalContext);
  const inputAnswer = useRef();
  const contributor = useRef();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!inputAnswer) return;

    const result = {
      content: inputAnswer.current.value,
      contributor: contributor.current.value,
    };

    pushToDatabase(`/api/answer/post/${id}`, result, "answer");
  };

  return (
    <form onSubmit={handleOnSubmit} className="AnswerQuestionContainer">
      <h3>Your answer</h3>
      <input
        type="text"
        ref={contributor}
        className="AnswerQuestionContributor"
        placeholder="Write your title here..."
      />
      <textarea
        ref={inputAnswer}
        className="AnswerQuestionTextarea"
        placeholder="Write your answer here..."
      />
      <button className="SubmitAnswer" type="submit">Post answer</button>
    </form>
  );
}
