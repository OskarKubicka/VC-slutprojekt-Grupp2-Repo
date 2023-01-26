// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getDatabase, set, ref, push, update, onValue, remove } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
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
const usernameInput = document.querySelector('#username')
const textBtn = document.querySelector('#text-button');
textBtn.addEventListener('click', createMessage);


function createMessage(event) {
  //Kollar om användaren har fyllt i namn och ett meddelande
  let isFormValid = document.getElementById('userForm').checkValidity();
  if (!isFormValid) {
    document.getElementById('userForm').reportValidity();
  } else {

    event.preventDefault();
    getTimestamp();

    const userText = textInput.value;
    const username = usernameInput.value;

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
    //Tar bort meddelanden som man klickar på
    messageOutput.addEventListener('click', ()=>{
      remove(ref(db, `${childKey}`));
    });

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



