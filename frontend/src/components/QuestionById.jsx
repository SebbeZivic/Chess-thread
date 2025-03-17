function QuestionById({ thread }) {
  return (
    <article>
      <h1 className="ClickedQuestionTitle">{thread.title}</h1>
      <p className="ClickedQuestionAnswer">{thread.content}</p>
    </article>
  );
}

export default QuestionById;
