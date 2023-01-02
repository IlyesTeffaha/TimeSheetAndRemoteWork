import Question from "../question/Question";
import "./questions.css";

export default function Questions({ questions }) {
  return (
    <div className="questions">
      {questions.map((q) => (
        <Question question={q} />
      ))}
    </div>
  );
}
