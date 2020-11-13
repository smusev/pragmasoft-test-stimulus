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
    if (cachedLogins.get(email) === pass) {
      return true
    } else if (cachedLogins.get(email)){
      throw new LoginException("password");
    } else {
      throw new LoginException("email");
    }
}

export function getEmail(email){
    getLogins()
    let isLegit = cachedLogins.has(email)
    return isLegit
}

function LoginException(message) {
   this.message = message;
}
