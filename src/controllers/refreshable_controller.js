import { Controller } from "stimulus"
import {getUser, newUser, resetEmail} from "../api"

export default class extends Controller {

  static targets = [ "content", "passwordInput", "emailInput", "validCheckmark", "passwordField", "button" ]

  connect(){}

  togglePasswordVisiblity(event){
    if (this.passwordFieldTarget.getAttribute('type') === "password") {
      this.passwordFieldTarget.setAttribute('type', 'text')
      event.target.classList.toggle('fa-eye')
      event.target.classList.toggle('fa-eye-slash')
    } else {
      this.passwordFieldTarget.setAttribute('type', 'password')
      event.target.classList.toggle('fa-eye')
      event.target.classList.toggle('fa-eye-slash')
    }
  }

  loginHandler(event){
    event.preventDefault()
    event.stopImmediatePropagation()
    let email = event.target.elements.email.value.trim().toLowerCase()
    let pass = event.target.elements.password.value

    try {
      let user = getUser(email, pass)
      this.setFormState({email:true, password:true, button:"success", buttonText:"Log in", message: "Welcome"})
    } catch (e) {
      if (e.message === "email"){
        this.setFormState({email:false, password:false, button:"danger", buttonText:"Retry", message: "Wrong email"})
      } else {
        this.setFormState({email:true, password:false, button:"danger", buttonText:"Retry", message: "Wrong password"})
     }
    }
  }

  signUpHandler(e){
    event.preventDefault()
    event.stopImmediatePropagation()
    let email = event.target.elements.email.value.trim().toLowerCase()
    let pass = event.target.elements.password.value
    try {
      let user = newUser(email, pass)
      this.setFormState({email:true, password:true, button:"success", buttonText:"Done", message: "Registered"})
    } catch (e) {
      this.setFormState({email:false, password:false, button:"danger", buttonText:"Retry", message: "Email already in use"})
    }
  }

  resetHandler(event){
    event.preventDefault()
    event.stopImmediatePropagation()
    let email = event.target.elements.email.value.toLowerCase().trim()
    let isLegit = resetEmail(email)
    if (isLegit){
      this.setFormState({email:true, button:"success", buttonText:"Done", message: "Success"})
    } else {
      this.setFormState({email:false, button:"danger", buttonText:"Retry", message: "Wrong email"})
    }
  }

  setFormState(state){
    this.contentTarget.innerHTML = state.message
    event.submitter.innerText = state.buttonText
    console.log(state)
    if (state.email === true){
      this.emailInputTarget.classList.remove('not-legit')
      this.emailInputTarget.classList.add('is-legit')
      this.validCheckmarkTarget.classList.remove('fa-times')
      this.validCheckmarkTarget.classList.add('fa-check')
    }
    if (state.email === false){
      this.emailInputTarget.classList.remove('is-legit')
      this.emailInputTarget.classList.add('not-legit')
      this.validCheckmarkTarget.classList.remove('fa-check')
      this.validCheckmarkTarget.classList.add('fa-times')
    }
    if (state.password === true) {
      this.passwordInputTarget.classList.remove('not-legit')
      this.passwordInputTarget.classList.add('is-legit')
    }
    if (state.password === false) {
      this.passwordInputTarget.classList.remove('is-legit')
      this.passwordInputTarget.classList.add('not-legit')
    }
    if (state.button === "success") {
      event.submitter.classList.remove('btn-danger')
      event.submitter.classList.add('btn-success')
    }
    if (state.button === "danger") {
      event.submitter.classList.remove('btn-success')
      event.submitter.classList.add('btn-danger')
    }
  }
}
