import { Controller } from "stimulus"
import {getUser, getEmail} from "../api"

export default class extends Controller {

  static targets = [ "content", "passwordInput", "emailInput", "validCheckmark", "passwordField" ]

  connect(){}
/*
  hidePlaceholder(event){
    if (event.target.value !== ""){
      event.target.classList.add('has-val')
    } else {
      event.target.classList.remove('has-val')
    }
  }
*/

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

/*
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
*/

  loginHandler(event){
    event.preventDefault()
    event.stopImmediatePropagation()
    let email = event.target.elements.email.value.trim().toLowerCase()
    let pass = event.target.elements.password.value

    try {
      getUser(email, pass)
      event.submitter.innerText = "Log in"
      this.contentTarget.innerHTML = "Welcome"
      event.submitter.classList.add('btn-success')
      event.submitter.classList.remove('btn-danger')
      this.validCheckmarkTarget.classList.remove('fa-times')
      this.validCheckmarkTarget.classList.add('fa-check')
      this.emailInputTarget.classList.remove('not-legit')
      this.passwordInputTarget.classList.remove('not-legit')
      this.emailInputTarget.classList.add('is-legit')
      this.passwordInputTarget.classList.add('is-legit')

  /*
      if (true) {
        this.passwordInputTarget.classList.remove('not-legit')
        this.passwordInputTarget.classList.add('is-legit')
      } else {
        if (email.trim() === ""){
          this.emailInputTarget.classList.add('not-legit')
        }
        this.contentTarget.innerHTML = "Wrong password"
      }
*/
    } catch (e) {
      event.submitter.classList.remove('btn-success')
      event.submitter.classList.add('btn-danger')
      event.submitter.innerText = "Retry"


       console.log(e.message); // передаем исключение в обработчик ошибок
       if (e.message === "email"){
         this.contentTarget.innerHTML = "Wrong email"
         this.emailInputTarget.classList.remove('is-legit')
         this.emailInputTarget.classList.add('not-legit')
         this.validCheckmarkTarget.classList.remove('fa-check')
         this.validCheckmarkTarget.classList.add('fa-times')
       } else {
           this.contentTarget.innerHTML = "Wrong password"
           this.validCheckmarkTarget.classList.remove('fa-times')
           this.validCheckmarkTarget.classList.add('fa-check')
           this.emailInputTarget.classList.remove('not-legit')
           this.passwordInputTarget.classList.remove('is-legit')
           this.emailInputTarget.classList.add('is-legit')
           this.passwordInputTarget.classList.add('not-legit')
       }
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
