import {Component} from 'react'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
    dispOnlyStarred: false,
  }

  onTitleEntry = event => {
    this.setState({titleInput: event.target.value})
  }

  onDateEntry = event => {
    this.setState({
      dateInput: event.target.value,
    })
  }

  onAddAppointment = () => {
    const {titleInput, dateInput} = this.state

    if (titleInput !== '' && dateInput !== '') {
      const formattedDate = format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      this.setState(prevState => ({
        appointmentsList: [
          ...prevState.appointmentsList,
          {
            id: uuidv4(),
            title: titleInput,
            date: formattedDate,
            isStarred: false,
          },
        ],
        dateInput: '',
        titleInput: '',
      }))
    }
  }

  onTogglingStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(item => {
        if (item.id === id) {
          return {
            ...item,
            isStarred: !item.isStarred,
          }
        }
        return item
      }),
    }))
  }

  onDisplayStarred = () => {
    this.setState(prevState => ({
      dispOnlyStarred: !prevState.dispOnlyStarred,
    }))
  }

  render() {
    const {
      titleInput,
      dateInput,
      appointmentsList,
      dispOnlyStarred,
    } = this.state
    const filteredAppointmentsList = appointmentsList.filter(item =>
      dispOnlyStarred ? item.isStarred === dispOnlyStarred : true,
    )

    return (
      <div className="bg-container1">
        <div className="card-container1">
          <div className="entry-container1">
            <div className="appointment-entry-container1">
              <h1 className="main-heading1">Add Appointment</h1>
              <label htmlFor="Title">Title</label>
              <input
                placeholder="Title"
                type="text"
                onChange={this.onTitleEntry}
                value={titleInput}
                id="Title"
              />
              <label htmlFor="Date">Date</label>
              <input
                placeholder="Title"
                type="date"
                onChange={this.onDateEntry}
                value={dateInput}
                id="Date"
              />
              <button
                className="add-button"
                onClick={this.onAddAppointment}
                type="button"
              >
                Add
              </button>
            </div>
            <img
              className="appointment-app-image"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr />
          <div className="appointments-display-container1">
            <div className="appointments-display-heading-container1">
              <h1 className="sub-heading2">Appointments</h1>
              <button
                className="starred-button1"
                type="button"
                onClick={this.onDisplayStarred}
              >
                Starred
              </button>
            </div>
            <ul>
              {filteredAppointmentsList.map(item => (
                <AppointmentItem
                  key={item.id}
                  itemData={item}
                  onTogglingStar={this.onTogglingStar}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
