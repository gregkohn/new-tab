export default class Weather {
  constructor(el) {
    this.el = el

    this.variables()
    this.grabTemp()
  }

  variables() {
    this.tempEl = this.el.querySelector('.weather__temp')
    this.iconEl = this.el.querySelector('.weather__icon svg use')
  }

  grabTemp() {
    let request = new XMLHttpRequest();
    request.open('GET', 'http://api.wunderground.com/api/3f42846c17797eb8/conditions/q/VA/Arlington.json', true)

    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        let data = JSON.parse(request.response)
        this.setTemp(this.formatTemp(data.current_observation.temp_f.toString()))
        this.setIcon(this.formatIcon(data.current_observation.icon))
      }
    }

    request.send()
  }

  formatTemp(temp) {
    //Remove decimal if necessary and add degree symbol
    if (temp.indexOf('.') !== -1){
      return (temp.substring(0, temp.indexOf('.')) + '&deg;')
    } else {
      return (temp + '&deg;')
    }
  }

  setTemp(temp) {
    this.tempEl.innerHTML = temp
  }

  formatIcon(conditions) {
    let icon = ''
    switch(conditions) {
      case 'mostlycloudy': case 'partlycloudy': case 'partlysunny':
        icon = 'partly-sunny'
        break
      case 'cloudy':
        icon = 'cloudy'
        break
      case 'rain':
        icon = 'shower'
        break
      case 'tstorms':
        icon = 'stormy'
        break
      case 'snow': case 'flurries': case 'sleet':
        icon = 'snow'
        break
      default:
        let d = new Date()
        d.getHours() > 7 && d.getHours() < 19 ? icon = 'sunny' : icon = 'night'
        break
    }
    return icon
  }

  setIcon(icon) {
    this.iconEl.setAttribute('xlink:href','images/icons.svg#' + icon)
  }
}