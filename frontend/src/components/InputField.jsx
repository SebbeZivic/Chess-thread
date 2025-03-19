// This component creates an input field that can be either a text input or a textarea.
export const InputField = ({
  label,
  id,
  type = "text",
  refProp, // A reference to the input element
  error, // Boolean indicating if there's an error
  children, // Additional text, like an error message
}) => (
  <div>
    {/* Label for the input field */}
    <label htmlFor={id}>{label}</label>

    {/* Display error message if 'error' is true */}
    <p className={error ? "error" : ""}>{children}</p>

    {/* Render either a textarea or an input field based on 'type' */}
    {type === "textarea" ? (
      <textarea className={error ? "error" : ""} id={id} ref={refProp} />
    ) : (
      <input
        type={type}
        id={id}
        ref={refProp}
        className={error ? "error" : ""}
      />
    )}
  </div>
);

//Input field som kan ta alla typer av inputs, text...
