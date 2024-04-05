export const InputBox = ({ label, placeholder, type, onChange, required }) => {
  return (
    <div style={{ width: "100%" }}>
      <input
        onChange={onChange}
        type={type}
        name={label}
        id={label}
        placeholder={placeholder}
        required={required}
        style={{
          display: "flex",
          padding: "2dvh 2dvw",
          width: "100%",
          fontWeight: "300",
          fontSize: "4vh",
          flexDirection: "column",
          border: "1px solid gray",
          borderRadius: "8px",
        }}
      />
    </div>
  );
};
