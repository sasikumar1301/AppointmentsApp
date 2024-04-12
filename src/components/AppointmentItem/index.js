import './index.css'

const AppointmentItem = props => {
  const {itemData, onTogglingStar} = props
  const {id, title, date, isStarred} = itemData

  const onClickingStar = () => {
    onTogglingStar(id)
  }

  const hollowStarUrl =
    'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const filledStarUrl =
    'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'

  const starImgUrl = isStarred ? filledStarUrl : hollowStarUrl

  return (
    <li className="appointment-card-container1">
      <div className="appointment-heading-container1">
        <p className="appointment-heading1">{title}</p>
        <button
          className="star-button1"
          data-testid="star"
          type="button"
          onClick={onClickingStar}
        >
          <img className="star-image1" src={starImgUrl} alt="star" />
        </button>
      </div>
      <p className="date-para1">{date}</p>
    </li>
  )
}

export default AppointmentItem
