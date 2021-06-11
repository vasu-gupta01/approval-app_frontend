import React from "react";
import PropTypes from "prop-types";

function Checkbox({
  class_name = "",
  type = "checkbox",
  value = "",
  id,
  key_val,
  checked = false,
  onChange,
}) {
  return (
    <input
      className={class_name}
      type={type}
      value={value}
      id={id}
      key={key_val}
      onChange={onChange}
      checked={checked}
    />
  );
}

Checkbox.propTypes = {
  class_name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  id: PropTypes.string,
  key_val: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
};

export default Checkbox;
