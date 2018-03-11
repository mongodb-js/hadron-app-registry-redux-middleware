import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

const Button = ({ onClick, children, ...otherProps }) => {
  return (
    <button className="Button" onClick={onClick} {...otherProps}>{children}</button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node
}

Button.defaultProps = {
  onClick: () => {}
};

export default Button;
export { Button };
