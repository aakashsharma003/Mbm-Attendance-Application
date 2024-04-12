import "./ListBox.css";
export const ListBox = ({
  onChange,
  id,
  options,
  bgcolor,
  color,
  padding,
  selected,
}) => {
  return (
    <select
      value={selected}
      name={id}
      className="select"
      onChange={onChange}
      id={id}
      style={{
        background: `${bgcolor}`,
        color: `${color}`,
        padding: `${padding}`,
        width: "100%",
      }}
    >
      {options &&
        options.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        })}
    </select>
  );
};
