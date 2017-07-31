import React from 'react';

const SubmitForm = (props) => {
  const { className, value } = props;

  return (
    <input
      type="submit"
      className={className}
      value={value}
    />
  );
};

export default SubmitForm;
