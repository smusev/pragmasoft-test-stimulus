import { Controller } from "stimulus"
import {getUser, getEmail} from "../api"

export default class extends Controller {

  static targets = [ "content", "passwordInput", "emailInput", "validCheckmark" ]

  connect(){}

  hidePlaceholder(event){
    if (event.target.value !== ""){
      event.target.classList.add('has-val')
    } else {
      event.target.classList.remove('has-val')
    }
  }

  togglePasswordVisiblity(event){
    if (this.passwordInputTarget.getAttribute('type') === "password") {
      this.passwordInputTarget.setAttribute('type', 'text')
      event.target.classList.toggle('fa-eye')
      event.target.classList.toggle('fa-eye-slash')
    } else {
      this.passwordInputTarget.setAttribute('type', 'password')
      event.target.classList.toggle('fa-eye')
      event.target.classList.toggle('fa-eye-slash')
    }
  }

  validateInput(event){
    let isLegit = getEmail(event.target.value.toLowerCase())
    console.log(isLegit)
//    if(event.target.value.trim().match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) !== null) {
    if(true){
      if (isLegit){
        this.emailInputTarget.classList.remove('not-legit')
        this.emailInputTarget.classList.add('is-legit')
        this.validCheckmarkTarget.classList.remove('fa-times')
        this.validCheckmarkTarget.classList.add('fa-check')
      } else {
        this.emailInputTarget.classList.remove('is-legit')
        this.emailInputTarget.classList.add('not-legit')
        this.validCheckmarkTarget.classList.remove('fa-check')
        this.validCheckmarkTarget.classList.add('fa-times')
        this.contentTarget.innerHTML = "Wrong Email"
      }
    } else if( event.target.value.trim() === ""){
      this.validCheckmarkTarget.classList.remove('fa-times')
      this.validCheckmarkTarget.classList.remove('fa-check')
      this.emailInputTarget.classList.remove('not-legit')
      this.emailInputTarget.classList.remove('is-legit')
    } else {
      this.validCheckmarkTarget.classList.remove('fa-check')
      this.validCheckmarkTarget.classList.add('fa-times')
      this.emailInputTarget.classList.remove('is-legit')
      this.emailInputTarget.classList.remove('not-legit')
      this.contentTarget.innerHTML = "Check email spelling"
    }
  }

  loginHandler(event){
    event.preventDefault()
    event.stopImmediatePropagation()
    let email = event.target.elements.email.value.trim().toLowerCase()
    let pass = event.target.elements.password.value
    let isAuth = getUser(email, pass)
    if (isAuth) {
      event.submitter.innerText = "Log in"
      event.submitter.classList.remove('btn-danger')
      event.submitter.classList.add('btn-success')
      this.passwordInputTarget.classList.remove('not-legit')
      this.passwordInputTarget.classList.add('is-legit')
    } else {
      if (email.trim() === ""){
        this.emailInputTarget.classList.add('not-legit')
      }
      event.submitter.innerText = "Retry"
      event.submitter.classList.remove('btn-success')
      event.submitter.classList.add('btn-danger')
      this.passwordInputTarget.classList.remove('is-legit')
      this.passwordInputTarget.classList.add('not-legit')
      this.contentTarget.innerHTML = "Wrong password"
    }
  }

  resetHandler(event){
    event.preventDefault()
    event.stopImmediatePropagation()
    let email = event.target.elements.email.value.toLowerCase()
    let isLegit = getEmail(email)
    if (isLegit){
      event.submitter.innerText = "Done"
      event.submitter.classList.remove('btn-danger')
      event.submitter.classList.add('btn-success')
    } else {
      if (email.trim() === ""){
        this.emailInputTarget.classList.add('not-legit')
      }
      event.submitter.innerText = "Retry"
      event.submitter.classList.remove('btn-success')
      event.submitter.classList.add('btn-danger')
    }
  }

/*  forgotHandler(){
    Turbolinks.visit("./forgot.html")
  }

  backToLoginHandler(){
    Turbolinks.visit("../index.html")
  }
*/
}
