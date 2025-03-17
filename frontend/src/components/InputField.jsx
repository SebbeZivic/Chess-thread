export const InputField = ({
  label,
  id,
  type = "text",
  refProp,
  error,
  children,
}) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <p className={error ? "error" : ""}>{children}</p>
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
