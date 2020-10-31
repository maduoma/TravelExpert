const greetings = ["Hello", "Hey", "How are you", "Whatsup", "Good to have you here", "How has been your day"];

function getGreeting() {

  let rand = Math.floor(Math.random() * greetings.length);
  return greetings[rand];

}

exports.greet = () => getGreeting();

console.log(getGreeting());