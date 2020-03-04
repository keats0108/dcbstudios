var desc = document.getElementsByClassName("content");
var x = document.getElementById("opened1");
var y = document.getElementById("opened2");
var z = document.getElementById("opened3");
var a = document.getElementById("opened4");
        
function open1(){
    if (x.style.display === "none") {
        x.style.display = "block";
        y.style.display = "none";
        z.style.display = "none";
        a.style.display = "none";
    } else {
        x.style.display = "none";
        y.style.display = "none";
        z.style.display = "none";
        a.style.display = "none";
    }
}
    
function open2(){
    if (y.style.display === "none") {
        x.style.display = "none";
        y.style.display = "block";
        z.style.display = "none";
        a.style.display = "none";
    } else {
        x.style.display = "none";
        y.style.display = "none";
        z.style.display = "none";
        a.style.display = "none";
    }
}
            
function open3(){
    if (z.style.display === "none") {
        x.style.display = "none";
        y.style.display = "none";
        z.style.display = "block";
        a.style.display = "none";
    } else {
        x.style.display = "none";
        y.style.display = "none";
        z.style.display = "none";
        a.style.display = "none";
    }
}
            
function open4(){
    if (a.style.display === "none") {
        x.style.display = "none";
        y.style.display = "none";
        z.style.display = "none";
        a.style.display = "block";
    } else {
        x.style.display = "none";
        y.style.display = "none";
        z.style.display = "none";
        a.style.display = "none";
    }
}
            
function close(){
    if (desc.style.display === "block") {
        desc.style.display = "none";
    } else {
        desc.style.display = "none";
    }
}