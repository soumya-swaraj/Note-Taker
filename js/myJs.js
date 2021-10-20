if(localStorage.getItem("notes") !=null){
    showNoteCard();
}
let add = document.getElementById("addBtn");
let notebox = document.getElementById("inputtext");
let LSNote;
add.addEventListener("click", function () {
    LSNote = localStorage.getItem("notes");
    let noteArr;
    if (LSNote == null) {
        noteArr = [];
    } else {
        noteArr = JSON.parse(LSNote);
    }
    if (notebox.value.length != 0) {
        noteArr.push(notebox.value);
        localStorage.setItem("notes", JSON.stringify(noteArr));
        notebox.value = "";
        showNoteCard();
        let warnmsg = document.getElementById("warnmsg");
        warnmsg.innerHTML = ``;
    }
    else {
        let warnmsg = document.getElementById("warnmsg");
        warnmsg.innerHTML = `Add some text in Note text box!`;
    }
});

function showNoteCard() {
    let LSNote = localStorage.getItem("notes")
    let notecards = document.getElementById("notecards");
    let noteArr = JSON.parse(LSNote);
    let html = "";

    noteArr.forEach(function (element, index) {
        html += `<div class="col-lg-4 cardss col-xxl-3 col-sm-6">
                   <div class="card mt-3">
                      <div class="card-body">
                         <h5 class="card-title">Note ${index + 1}</h5>
                         <p class="card-text">${element}</p>
                         <button id="${index}" onclick="delCard(this.id)" class="btn btn-primary">Delete</button>
                      </div>
                    </div>
                   </div>`;
    });

    notecards.innerHTML = html;

}

let clrBtn = document.getElementById("clrBtn");
clrBtn.addEventListener("click", function () {
    localStorage.clear();
    let notecards = document.getElementById("notecards");
    notecards.innerHTML = "";
    let warnmsg = document.getElementById("warnmsg");
    warnmsg.innerHTML = ``;
});

function delCard(idIndex) {
    delNode = document.getElementById(idIndex);
    let notes = localStorage.getItem("notes");
    let noteArr = JSON.parse(notes);
    noteArr.splice(idIndex, 1);
    localStorage.setItem("notes", JSON.stringify(noteArr));
    showNoteCard();
}
// console.log(LSNote);

let search = document.getElementById("searchbox");
search.addEventListener("input", function () {
    let svalue = search.value.toLowerCase();
    let notecards = document.getElementsByClassName("cardss");
    Array.from(notecards).forEach(function (element) {
        let cardtxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        console.log(cardtxt);
        if (!(cardtxt.includes(svalue))) {
            element.style.display = "none";
        }
    });

});