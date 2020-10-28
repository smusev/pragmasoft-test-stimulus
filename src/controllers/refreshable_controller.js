import { Controller } from "stimulus"

export default class extends Controller {

  static targets = [ "content", "passwordVisiblity", "emailInput", "eyeIcon" ]

  connect(){}

  hidePlaceholder(event){
    if (event.target.value !== ""){
      event.target.classList.add('has-val')
    } else {
      event.target.classList.remove('has-val')
    }
  }

  togglePasswordVisiblity(){
    if (this.passwordVisiblityTarget.getAttribute('type') === "password") {
      this.passwordVisiblityTarget.setAttribute('type', 'text')
      this.eyeIconTarget.classList.toggle('fa-eye')
      this.eyeIconTarget.classList.toggle('fa-eye-slash')
    } else {
      this.passwordVisiblityTarget.setAttribute('type', 'password')
      this.eyeIconTarget.classList.toggle('fa-eye')
      this.eyeIconTarget.classList.toggle('fa-eye-slash')
    }
  }

  refresh(event){
    event.preventDefault()
    event.stopImmediatePropagation()
    console.log("refresh!")
    this.contentTarget.innerHTML = "Refresh!"
  }

}
