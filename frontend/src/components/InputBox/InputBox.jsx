import "./InputBox.css";
export const InputBox = ({
  label,
  placeholder,
  type,
  onChange,
  required,
  defaultValue,
  disabled,
  bgcolor,
  color,
  margin,
}) => {
  return (
    <div style={{ width: "100%" }}>
      <input
        onChange={onChange}
        type={type}
        name={label}
        id={label}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
        disabled={disabled}
        style={{
          background: `${bgcolor}`,
          color: `${color}`,
          margin: `${margin}`,
        }}
      />
    </div>
  );
};
