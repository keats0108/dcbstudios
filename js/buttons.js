var x = document.getElementById("opened1");
var y = document.getElementById("opened2");
var z = document.getElementById("opened3");
        
function open1(){
    if (x.style.display === "none") {
        x.style.display = "block";
        y.style.display = "none";
        z.style.display = "none";
    } else {
        x.style.display = "none";
        y.style.display = "none";
        z.style.display = "none";
    }
}
    
function open2(){
    if (x.style.display === "none") {
        x.style.display = "none";
        y.style.display = "block";
        z.style.display = "none";
    } else {
        x.style.display = "none";
        y.style.display = "none";
        z.style.display = "none";
    }
}
            
function open3(){
    if (x.style.display === "none") {
        x.style.display = "none";
        y.style.display = "none";
        z.style.display = "block";
    } else {
        x.style.display = "none";
        y.style.display = "none";
        z.style.display = "none";
    }
}
            
function close(){
    if (x.style.display === "block" || y.style.display === "block" || z.style.display === "block") {
        x.style.display = "none";
        y.style.display = "none";
        z.style.display = "none";
    } else {
        x.style.display = "none";
        y.style.display = "none";
        z.style.display = "none";
    }
}