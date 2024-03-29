import PropTypes from 'prop-types'
import './style/CardDisplay.css'

const CardDisplay = (props) => {
  return (
    <div className='card'>
      <div className="title">
          {props.Title}{props.number}
      </div>
    </div>
  )
}

CardDisplay.propTypes = {
     Title: PropTypes.string.isRequired,
     number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
   }

export default CardDisplay
