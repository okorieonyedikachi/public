const memoList = document.querySelector("#memo-list");
const form = document.querySelector("#add-memo-form");

function renderMemo(doc) {
  //diff elements
  let li = document.createElement("li");
  let name = document.createElement("p");
  let desc = document.createElement("span");
  let cross = document.createElement("div");
  let edit = document.createElement("span");
 // This line of code below attaches "data-id" to add the Auto ID   firebase will generate.
 // we are doing this so that in future we can easily get a particular doc and manipulate it.
  li.setAttribute("data-id", doc.id);
  name.textContent = doc.data().name;
  desc.textContent = doc.data().desc;
  cross.textContent = "X";

  li.appendChild(name);
  li.appendChild(desc);
  li.appendChild(cross);
  memoList.appendChild(li);
}


db.collection('Memo-webApp').get().then((snapshot) => {
  console.log(snapshot.docs);
  snapshot.docs.forEach(doc => {
   console.log(doc.data())
  })
  
});

//real time listener
db.collection("memo")
.orderBy("desc")
.onSnapshot(snapshot => {
// We also rendered data in real-time using
 let changes = snapshot.docChanges();
 changes.forEach(change => {
  if (change.type == "added") {
  renderMemo(change.doc);
 } else if (change.type == "removed") {
 let li = memoList.querySelector("[data-id=" + change.doc.id + "]");
 memoList.removeChild(li);
  }
 });
});


//saving data
form.addEventListener("submit", e => {
  //read this
  e.preventDefault();
  db.collection("Memo-webApp").add({
   name: form.name.value,
   desc: form.desc.value
  }); 
  form.name.value = "";
  form.desc.value = "";
  alert("New memo added")
 });

 //getting data
 db.collection('memo').get().then((snapshot) => {
  console.log(snapshot.docs);
  snapshot.docs.forEach(doc => {
    console.log(doc.data())
   })
  
 });