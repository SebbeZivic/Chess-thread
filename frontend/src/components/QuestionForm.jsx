import { useContext, useRef, useState } from "react";
import { GlobalContext } from "../context/GlobalContextProvider";
import { InputField } from "./InputField";

export function QuestionForm() {
  const { fetchData, pushToDatabase } = useContext(GlobalContext);
  const titleRef = useRef();
  const contentRef = useRef();
  const categoryRef = useRef();

  const [errors, setErrors] = useState({
    title: false,
    content: false,
    category: false,
  });

  const checkValidation = () => {
    let isValid = true;
    let newErrors = { title: false, content: false, category: false };

    if (titleRef.current.value.length < 3) {
      newErrors.title = true;
      isValid = false;
    }

    if (contentRef.current.value.length < 5) {
      newErrors.content = true;
      isValid = false;
    }

    if (!categoryRef.current.value) {
      newErrors.category = true;
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (checkValidation()) {
      const questionResults = {
        title: titleRef.current.value,
        content: contentRef.current.value,
        category: categoryRef.current.value,
      };

      console.log("Submitting:", questionResults);

      pushToDatabase(`/api/questions/post`, questionResults, `question`);
    } else {
      console.log("Validation failed:", errors);
    }
  };

  return (
    <form onSubmit={handleOnSubmit} className="QuestionForm">
      <InputField
        label="Type your question title here:"
        refProp={titleRef}
        error={errors.title}
      />
      <InputField
        label="Describe your question here:"
        refProp={contentRef}
        type="textarea"
        error={errors.content}
      />
      <div>
        <label htmlFor="category">Category:</label>
        <select
          ref={categoryRef}
          id="category"
          className="QuestionCategorySelect"
        >
          <option value="">Select a category</option>
          <option value="Chess talk">Chess talk</option>
          <option value="Chesstactics">Chess tactics</option>
          <option value="ChessOpenings">Chess openings</option>
        </select>
        {errors.category && <p className="error">Please select a category.</p>}
      </div>
      <button type="submit" className="SubmitQuestionButton">
        Submit
      </button>
    </form>
  );
}
