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
    if (this.cacheStillValid()) {
      this.loadFromCache()
    } else {
      let request = new XMLHttpRequest();
      request.open('GET', 'http://api.wunderground.com/api/3f42846c17797eb8/conditions/q/VA/Arlington.json', true)

      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          let data = JSON.parse(request.response)
          let temp = this.formatTemp(data.current_observation.temp_f.toString())
          let icon = this.formatIcon(data.current_observation.icon)

          this.setTemp(temp)
          this.setIcon(icon)
          this.cacheInfo(temp, icon)
        }
      }

      request.send()
    }
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

  cacheInfo(temp, icon) {
    localStorage.setItem('temp', temp)
    localStorage.setItem('icon', icon)
    localStorage.setItem('timeCached', (new Date).getTime())
  }

  cacheStillValid() {
    return ((new Date).getTime() - localStorage.getItem('timeCached')) < 60000 //if less than a minute old
  }

  loadFromCache() {
    this.setTemp(localStorage.getItem('temp'))
    this.setIcon(localStorage.getItem('icon'))
  }
}