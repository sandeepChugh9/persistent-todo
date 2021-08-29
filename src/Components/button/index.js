
import PropTypes from "prop-types";
import './index.css';

const Button = ({ text , onClick , styles, inProgress}) => {
  return (
    <div className={'custom-button'} style={styles} onClick={onClick}>{`${text}${inProgress?'...':''}`}</div>
  )
}

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  styles: PropTypes.object
}

Button.defaultProps = {
  text: 'Submit',
  onClick: () => {},
  styles: {}
}


export default Button;