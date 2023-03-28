const input = document.querySelector("input")
const output = document.querySelector("output")
let imagesArray = []

import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyBOv7f3jBijB55qzzgFzJgZs9W3lWsnLG4",
    authDomain: "colal-ae06f.firebaseapp.com",
    projectId: "colal-ae06f",
    storageBucket: "colal-ae06f.appspot.com",
    messagingSenderId: "660958602583",
    appId: "1:660958602583:web:996805efd91f7fc3fc4a12",
    measurementId: "G-19Q2STYEBR",
    storageBucket: ''
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);
const storageRef = ref(storage, "images")

input.addEventListener("change", function() {
    const file = input.files
    imagesArray.push(file[0])
    uploadFile(storageRef, file)
    displayImages()
})

function displayImages() {
    let images = ""
    imagesArray.forEach((image, index) => {
        images += `<div class="image">
                <img src="${URL.createObjectURL(image)}" alt="image">
                <span onclick="deleteImage(${index})">&times;</span>
            </div>`
    })
    output.innerHTML = images
}

function deleteImage(index) {
    imagesArray.splice(index, 1)
    displayImages()
}

function uploadFile(storageRef, file){
    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    });  
}