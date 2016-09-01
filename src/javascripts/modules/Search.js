export default class Search {
  constructor(el) {
      this.el = el

      this.variables()
      this.listen()
  }

  variables() {
    this.searchInputs = this.el.querySelectorAll('[data-queryurl]')
  }

  listen() {
    Array.prototype.forEach.call(this.searchInputs, (input) => {
      //Prevent clicking input from triggering link
      input.addEventListener('click', this.inputClick)

      //Search selected category upon pressing enter
      input.addEventListener('keypress', this.inputSearch.bind(this))
    })
  }

  inputClick(e) {
    e.preventDefault()
  }

  inputSearch(e) {
    let input      = e.currentTarget
    let queryUrl   = input.getAttribute('data-queryurl')
    let query      = input.value
    let keyPressed = e.which

    if (keyPressed === 13) {
      this.search(query, queryUrl)
    }
  }

  search(query, queryUrl) {
    window.location.href = queryUrl + query
  }
}