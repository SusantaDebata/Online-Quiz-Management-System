import PropTypes from 'prop-types'
import './Style/CardS.css'
import { useNavigate } from 'react-router-dom'

const CardS = (props) => {

  const navigate = useNavigate();

  const donav = () => {
    navigate(props.dlink, {
      state:
      {
        Back: "enable"
      }
    })
  }

  return (
    <div className="cards" onClick={donav}>
      <div className="img">
        <img src={props.imglink} alt="img" />
      </div>
      <div className="titles">
        {props.Title}
      </div>
    </div>
  )
}

export default CardS

CardS.propTypes = {
  Title: PropTypes.string,
  imglink: PropTypes.string,
  dlink: PropTypes.string
}
