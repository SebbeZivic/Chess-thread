import { Link } from "react-router-dom";

function AddQuestionbutton() {
  return (
    <Link to="/app/question" className="AddQuestionsButton">
      Ask a question
    </Link>
  );
}

export default AddQuestionbutton;
