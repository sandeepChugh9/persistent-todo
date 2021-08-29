
import PropTypes from "prop-types";
import './index.css';

const Input = ({ id, type, label, value, onChange , name}) => {
  const classes = value.length ? 'Input Input--has-value' : 'Input'
  return (
    <div className={classes}>
      <input id={id} name={name} type={type} value={value} onChange={onChange} />
      <label htmlFor={id} className="Input__label">{label}</label>
    </div>
  )
}

Input.propTypes = {
  type: PropTypes.string,
  name:PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
}

Input.defaultProps = {
  type: 'text',
  label: '',
  name:'',
  value: '',
  onChange: () => {},
  id: 'id'
}


export default Input;