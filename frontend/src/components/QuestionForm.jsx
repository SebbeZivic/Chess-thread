import { useContext, useRef, useState } from "react";
import { GlobalContext } from "../context/GlobalContextProvider";
import { InputField } from "./InputField";

export function QuestionForm() {
  const { fetchData, pushToDatabase } = useContext(GlobalContext);

  // Create references for input fields
  const titleRef = useRef();
  const contentRef = useRef();
  const categoryRef = useRef();

  // State to track validation errors
  const [errors, setErrors] = useState({
    title: false,
    content: false,
    category: false,
  });

  // Function to validate input fields
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

    // Check if a category is selected
    if (!categoryRef.current.value) {
      newErrors.category = true;
      isValid = false;
    }

    // Update error state
    setErrors(newErrors);

    return isValid;
  };

  // Function to handle form submission
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (checkValidation()) {
      // Create an object with the form data
      const questionResults = {
        title: titleRef.current.value,
        content: contentRef.current.value,
        category: categoryRef.current.value,
      };

      // Send data to the database
      pushToDatabase(`/api/questions/post`, questionResults, `question`);
    } else {
      console.log("Validation failed:", errors);
    }
  };

  return (
    <form onSubmit={handleOnSubmit} className="QuestionForm">
      {/* Input for the question title */}
      <InputField
        label="Type your question title here:"
        refProp={titleRef}
        error={errors.title}
      />

      {/* Input for the question description */}
      <InputField
        label="Describe your question here:"
        refProp={contentRef}
        type="textarea"
        error={errors.content}
      />

      {/* Dropdown for selecting a category */}
      <div>
        <label htmlFor="category">Category:</label>
        <select
          ref={categoryRef}
          id="category"
          className="QuestionCategorySelect"
        >
          <option value="">Select a category</option>
          <option value="Chess talk">Chess talk</option>
          <option value="Chess tactics">Chess tactics</option>
          <option value="Chess openings">Chess openings</option>
        </select>

        {errors.category && <p className="error">Please select a category.</p>}
      </div>

      <button type="submit" className="SubmitQuestionButton">
        Submit
      </button>
    </form>
  );
}
