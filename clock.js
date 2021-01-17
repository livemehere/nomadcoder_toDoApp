const clockContainer = document.querySelector('.js-clock'),
      clockTitle = clockContainer.querySelector('h1');

function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const secondes = date.getSeconds();
    clockTitle.innerText = `${hours}:${minutes < 10 ? `0${minutes}`:`${minutes}`}:${secondes < 10 ? `0${secondes}`: `${secondes}`}`
}


function init(){
    setInterval(getTime,1000) //setInterval은 (주기적으로실행할함수,1/1000초 시간)
}

init();
