export default class Api {}

(function (){
  var logins = [
    { 'email': 'user1@test.proj', 'password': 'password1'},
    { 'email': 'user2@test.proj', 'password': 'password2'},
    { 'email': 'user3@test.proj', 'password': 'password3'}
  ];

  localStorage.setItem('users', JSON.stringify(logins));
})();

export function getUser(email, pass){
   let storedLogins = JSON.parse(localStorage.getItem('users'));
   let isAuth = storedLogins.some((user) => user.email === email && user.password === pass )
   return isAuth
}

export function getEmail(email){
   let storedLogins = JSON.parse(localStorage.getItem('users'));
   let isLegit = storedLogins.some((user) => user.email === email )
   return isLegit
}
