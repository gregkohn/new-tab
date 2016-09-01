export default class Time {
  constructor(el) {
    this.el = el

    this.setTime()
    this.updateTime()
    this.grabTemp()

    // console.log(this.grabTemp())
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

  grabTemp() {
    let request = new XMLHttpRequest();
    request.open('GET', 'http://api.wunderground.com/api/3f42846c17797eb8/conditions/q/VA/Arlington.json', true)

    request.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        let data = JSON.parse(this.response)
        // this.temp = data.current_observation.temp_f.toString()
        // console.log('asdf')
        return 'gregggg'
      }
    };

    request.send()
  }

  test() {
    console.log('GREGGG')
  }
}