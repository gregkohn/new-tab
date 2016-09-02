export default class Time {
  constructor(el) {
    this.el = el

    this.setTime()
    this.updateTime()
  }

  updateTime() {
    setInterval(() => {
      this.setTime()
    }, 10000)
  }

  setTime() {
    this.el.innerHTML = this.grabTime()
  }

  grabTime() {
    let d = new Date()

    //Grab the time in hours and minutes
    let hour = d.getHours()
    let minutes = d.getMinutes()

    //Format them
    if (hour > 12) {
      hour -= 12
    }

    if (hour === 0) {
      hour = 12
    }

    if (minutes < 10) {
      minutes = '0' + minutes
    }

    return hour + ':' + minutes
  }
}