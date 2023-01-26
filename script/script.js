// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getDatabase, set, ref, push, update, onValue } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5OB823j9GkOwSt9nZ5T4BRbFyh0smfWo",
  authDomain: "test-version-24.firebaseapp.com",
  databaseURL: "https://test-version-24-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "test-version-24",
  storageBucket: "test-version-24.appspot.com",
  messagingSenderId: "637168038645",
  appId: "1:637168038645:web:6e4339023b8dc18b240bbc",
  measurementId: "G-2XJSGS07Q3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

console.log(db);
let timestamp;


// input till databas
const textInput = document.querySelector('#text-input');
const usernameInput = document.querySelector('#username-input')
const textBtn = document.querySelector('#text-button');
textBtn.addEventListener('click', createMessage);


function createMessage(event) {
  event.preventDefault();
  getTimestamp();

  const userText = textInput.value;
  const username = usernameInput.value;


  //user måste ange ett username och ett message
  if (username == "" && userText == "") {
    alert("Username required & message-box cannot be empty")
  }

  else if (username == "") {
    alert("Username required")
  }

  else if (userText == "") {
    alert("Message-box cannot be empty")
  }

  else {
    //Pushar message till databasen
    push(ref(db, "/"), {

      name: username,
      message: userText,

      time: timestamp
    })

    console.log(userText)
    usernameInput.value = '';
    textInput.value = '';
  }
}


// display messages
onValue(ref(db, '/'), (snapshot) => {
  const messageDiv = document.querySelector('#messageDiv');
  messageDiv.innerHTML = '';

  snapshot.forEach((childSnapshot) => {
    const childKey = childSnapshot.key;
    const childData = childSnapshot.val();
    console.log(childKey, childData);
    const messageOutput = document.createElement('div');
    messageDiv.prepend(messageOutput);

    const messagePar = document.createElement('p');
    messageOutput.appendChild(messagePar);
    const timestampText = document.createElement('p');
    messageOutput.appendChild(timestampText);


    timestampText.innerText = childData.time;
    messagePar.innerText = childData.message;
    messageOutput.classList.add("messageCard");

    messagePar.innerText = childData.name + ": " + childData.message;

  });
});

function getTimestamp() {
  // get timestamp
  const date = new Date();
  const dateToString = date.toString();
  const dateSplit = dateToString.split(' ');
  console.log(dateSplit);
  timestamp = `${dateSplit[1]} ${dateSplit[2]} ${dateSplit[3]} ${dateSplit[4]}`;
  console.log(timestamp);
}



