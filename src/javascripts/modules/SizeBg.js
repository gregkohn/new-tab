export default class SizeBg {
  constructor(el) {
    this.el = el

    this.variables()
    this.determineAspect()
    this.listen()
  }

  variables() {
    this.pictureWidth  = 1280
    this.pictureHeight = 800
    this.pictureRatio  = this.pictureWidth / this.pictureHeight
  }

  listen() {
    window.addEventListener('resize', this.debounce(this.determineAspect.bind(this), 100))
  }

  determineAspect() {
    this.calculateWindowRatio()

    if (this.pictureRatio > this.windowRatio) {
      this.triggerFullHeight()
    } else {
      this.triggerFullWidth()
    }
  }

  calculateWindowRatio() {
    this.windowRatio   = window.innerWidth / window.innerHeight
  }

  triggerFullHeight() {
    this.el.classList.add('-full-height-bg')
  }

  triggerFullWidth() {
    this.el.classList.remove('-full-height-bg')
  }

  debounce(func, wait, immediate) {
    let timeout
    return function() {
      let context = this, args = arguments
      let later = function() {
        timeout = null
        if (!immediate) func.apply(context, args)
      }
      let callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) func.apply(context, args)
    }
  }
}
