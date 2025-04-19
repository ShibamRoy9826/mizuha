let currDate= new Date();
let date =  currDate.getDate()+" "+currDate.toLocaleString('default', { month: 'long' })+" "+currDate.getFullYear();
let hrs=currDate.getHours()
let ampm= hrs >= 12 ? 'PM' : 'AM'
let time = hrs+":"+currDate.getMinutes()+" "+ampm;


const d=document.getElementById("date");
const t=document.getElementById("time");

function setDateTime(){
    d.innerHTML=date;
    t.innerHTML=time;
}
const i=setInterval(setDateTime(),1000);

const search=document.getElementById("search");
const searchButton=document.getElementById("searchButton");
searchButton.onclick=function(){window.location.href='http://www.google.com/search?q=' + encodeURIComponent(search.value)};