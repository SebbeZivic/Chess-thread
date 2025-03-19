import { useContext, useRef } from "react";
import { GlobalContext } from "../context/GlobalContextProvider";

// This component allows users to submit an answer to a question
export function AnswerQuestion({ id }) {
  // Get pushToDatabase function from GlobalContext
  const { pushToDatabase } = useContext(GlobalContext);

  // useRef is used to access input fields without storing values in state
  const inputAnswer = useRef();
  const contributor = useRef();

  // Function that runs when the form is submitted
  const handleOnSubmit = (e) => {
    e.preventDefault(); // Prevents the page from reloading when submitting the form

    // Check if inputAnswer is defined
    if (!inputAnswer) return;

    // Create an object with the answer content and contributor name
    const result = {
      content: inputAnswer.current.value, // Get the answer text from the input field
      contributor: contributor.current.value,
    };

    // Send the answer to the database using an API call
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
      <button className="SubmitAnswer" type="submit">
        Post answer
      </button>
    </form>
  );
}
