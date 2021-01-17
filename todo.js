const toDoForm = document.querySelector('.js-toDoForm')
const toDoInput = toDoForm.querySelector('input')
const toDoList = document.querySelector('.js-toDoList')


const TODOS_LS = 'toDos';

let toDos = [];


// html에서 지운건 이해되는데, 이 clean부분이 잘이해가안됨(local stroage 삭제 파트임..ㅠㅠ)
function deleteToDo(event){ //html에서 삭제
    //console.log(event.target.parentNode) //parentNode를 찾기위해서는 log 대신 dir을 이용해서 요소를 찾았다.
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){ //filter 또한 forEach처럼 동작함
        return toDo.id !== parseInt(li.id);
    });
    console.log(cleanToDos)
    toDos = cleanToDos;
    saveToDos();
}


// js 는 local storage에 있는 모든 데이터를 string으로 저장한다.true를 저장해도 boolean이 아닌 'true'를 저장함
// 그래서 그냥 obj형태로 저장하게되면 local storage에 내용은 안나오고 obj형태로만 나옴
function saveToDos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos)); //JSON.stringfy(obj) = js 오브젝트를 string으로 변환해줌
}


function paintToDo(text){
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    delBtn.innerText ='❌';
    delBtn.addEventListener('click',deleteToDo);
    const newId = toDos.length+1;
    const span = document.createElement('span');
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);

    const toDoObj = {
        text:text,
        id:newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
    
    
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null){
        console.log(loadedToDos);
        const parsedToDos = JSON.parse(loadedToDos);
        console.log(parsedToDos);
        parsedToDos.forEach(function(toDo){ //array는 forEach를 써서 각 요소에, 함수를 각각 실행하도록 할수잇음
            paintToDo(toDo.text);
        })
    }
}


function init(){
    loadToDos();
    toDoInput.focus();
    toDoForm.addEventListener('submit',handleSubmit);
}

init();