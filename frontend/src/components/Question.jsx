import { Link } from "react-router-dom";

function Question({ data }) {
  return (
    <Link to={`question/${data.threadId}`}>
      <article>
        <div className="HomePageQuestionAnswer">
          <h3 className="Question-title">{data.title}</h3>
          <p className="Answer-question">{data.content}</p>
        </div>
      </article>
      <p className="ViewAnswers"> View all answers </p>
    </Link>
  );
}

export default Question;
