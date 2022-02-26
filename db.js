//Open DataBase
let db;
let openRequest = indexedDB.open("myDataBase");
openRequest.addEventListener("success", (e) =>{
    console.log("DB Success");
    db = openRequest.result;
})
openRequest.addEventListener("error", (e) =>{
    console.log("DB error");
})
openRequest.addEventListener("upgradeneeded", (e) =>{
    console.log("DB upgraded");
    db = openRequest.result;

    //Create ObjectStore
    db.createObjectStore("video", {keyPath: "id"}); 
    db.createObjectStore("image", {keyPath: "id"}); 
})