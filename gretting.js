const form = document.querySelector('.js-form');
const input = form.querySelector('input');
const greeting = document.querySelector('.js-greetings')

const USER_LS = 'currentUser';
const SHOWING_CN = 'showing';


function saveName(text){
    localStorage.setItem(USER_LS,text) //LocalStorage는 URL을 기반으로 동작한다(한마디로,이 웹사이트 자체의 저장소이다)
}

function handleSubmit(event){
    event.preventDefault(); //form은 submit을하면 새로고침을하게되있는데, 그것을 안되게 하는것
    const currentInput = input.value; 
    paintGreeting(currentInput)
    saveName(currentInput)
    
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}


function askForName(){
    form.classList.add(SHOWING_CN)
    form.addEventListener('submit',handleSubmit);
}


function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        //she is not
        askForName();
    }else{
        //she is
        paintGreeting(currentUser);
    }
}


function init(){
    loadName();
}

init();