// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc,} from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyAo5BRglK6pqSzMbl0qUaPK__iwZBsVJ7A",
authDomain: "todo-web-app-51374.firebaseapp.com",
projectId: "todo-web-app-51374",
storageBucket: "todo-web-app-51374.appspot.com",
messagingSenderId: "425767597586",
appId: "1:425767597586:web:02077b68302b6f77be0acb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const querySnapshot = await getDocs(collection(db, "tasks"));
querySnapshot.forEach((doc) => {
    loadElement(doc);
});

function loadElement(doc) {
    const li = document.createElement("li");
    li.setAttribute('data-id', doc.id);
    var taskName = doc.data().task;
    var textNode = document.createTextNode(taskName);
    li.appendChild(textNode);
    document.getElementById("myUL").appendChild(li);
}

var form = document.getElementById("addingTask");
form.addEventListener("submit", (e) => {
    // don't have a server set up
    e.preventDefault();
    addTask(form.newTask.value);
})

async function addTask(value) {
    try {
        const docRef = await addDoc(collection(db, "tasks"), {
            task: value,
        })
        console.log("Yay, we added a task to the firestore database");
    } catch (e) {
        console.error("Oh no", e);
    }
}

var myList = document.getElementsByTagName("li");
for (var i = 0; i < myList.length; i++) {
    var span = document.createElement("span");
    var text = document.createTextNode("\u00d7");
    span.className = "close";
    span.appendChild(text);
    myList[i].appendChild(span);
}

var deleteButton = document.getElementsByClassName("close");
for (var i = 0; i < deleteButton.length; i++) {
    deleteButton[i].onclick = async function () {
        var id = this.parentElement.getAttribute("data-id");
        await deleteDoc(doc(db, "tasks", id));
    }
}