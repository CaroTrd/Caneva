import React from 'react';

const renderField = (
  {
    className, placeholder, style, value, id, type, label, input, meta: { touched, error },
  },
) => (
  // eslint-disable-next-line react/jsx-filename-extension
  <div className="relative-form">
    <input
      {...input}
      type={type}
      id={id}
      value={value}
      label={label}
      placeholder={placeholder}
      className={className}
      style={style}
    />
    {
        touched && error
        && <span className="error">{error}</span>
      }
  </div>
);

export default renderField;
