import React from "react";

const TextField = ({
  error,
  info,
  isDisabled,
  name,
  onChange,
  placeholder,
  type,
  value,
}) => {
  return (
    <div>
      {name}:{" "}
      <input
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
        disabled={isDisabled}
      />
      {error && <div>{error}</div>}
      {info && <small>{info}</small>}
    </div>
  );
};

export default TextField;
