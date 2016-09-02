export default class SizeBg {
  constructor(el) {
    this.el = el

    this.variables()
    this.img.onload = () => {
      this.determineBgSize()
      this.determineAspect()
      this.listen()
    }
  }

  variables() {
    this.img = document.getElementById('testBgSize')
  }

  listen() {
    window.addEventListener('resize', this.debounce(this.determineAspect.bind(this), 100))
  }

  determineBgSize() {
    this.pictureWidth  = this.img.naturalWidth
    this.pictureHeight = this.img.naturalHeight
    this.pictureRatio  = this.pictureWidth / this.pictureHeight
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
