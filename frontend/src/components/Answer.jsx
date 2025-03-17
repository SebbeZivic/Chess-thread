export function Answer({ data }) {
  return (
    <section className="ClickedQuestionTitle-Answer">
      <h4 >{data.contributor}</h4>
      <p>{data.answerContent}</p>
    </section>
  );
}
