export default class Api {}

(function (){
  var logins = new Map([
    ['user1@test.proj', 'password1'],
    ['user2@test.proj', 'password2'],
    ['user3@test.proj', 'password3']
  ]);

  localStorage.setItem('users', JSON.stringify(Array.from(logins)))
})();

let cachedLogins = new Map()

function getLogins() {
  if (!cachedLogins.size) {
    cachedLogins = new Map(JSON.parse(localStorage.getItem('users')))
  }
}

export function getUser(email, pass){
    getLogins()
    console.log(email, pass)
    if (cachedLogins.get(email) === pass) {
      return {isAuth: true}
    } else if (cachedLogins.get(email)){
      throw new LoginException("password");
    } else {
      throw new LoginException("email");
    }
}

export function newUser(email, pass){
    getLogins()
    if (cachedLogins.get(email)) {
      throw new LoginException("email");
    } else {
      addUser(email, pass)
      return {registered: true}
    }
}

export function resetEmail(email){
    getLogins()
    let status = cachedLogins.has(email)
    return status
}

function addUser(email, pass) {
    cachedLogins.set(email, pass)
    localStorage.setItem('users', JSON.stringify(Array.from(cachedLogins)))
}

function LoginException(message) {
   this.message = message;
}
