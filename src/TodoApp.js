import React, { useState } from 'react';
import axios from 'axios';
import './TodoApp.css';

function TodoApp() {
  let GetTodolist = (e) => {
    axios.get('https://killsanghyuck.github.io/prography_5th_front/todoDummy.json')
      .then((res)=>{
        setTodo(res.data.body);
      })
      .catch((err)=>{
        document.write(err);
      })
  }
  let EnterPressed = () => {
    console.dir(document.getElementsByClassName('AddTodo')[0]);
    if (window.event.keyCode == 13) {
      let todocopy = todolist.slice();
      let todotext = document.getElementsByClassName('AddTodo')[0].value;
      if (!todotext) {
        alert('내용을 입력하세요!');
        return;
      }
      todocopy.push({ title: todotext, status: "todo" });
      setTodo(todocopy);
      document.getElementsByClassName('AddTodo')[0].value = "";
    }
  }
  let AddTodo = () => {
    let todocopy = todolist.slice();
    let todotext = document.getElementsByClassName('AddTodo')[0].value;
    if(!todotext){
      alert('내용을 입력하세요!');
      return;
    }
    todocopy.push({title: todotext, status: "todo"});
    setTodo(todocopy);
    document.getElementsByClassName('AddTodo')[0].value = "";
  }
  let ToggleTodo = () => {
    document.getElementsByClassName('fa-chevron-down')[0].classList.toggle('IconClicked');
    let text = document.getElementsByClassName('TogglerText')[0].innerText;
    if(text === '접기') {
      document.getElementsByClassName('TogglerText')[0].innerText = '펴기';
      document.getElementsByClassName('TodoList')[0].style.transform = 'translateY(-100%)';
      document.getElementsByClassName('TodoList')[0].style.opacity = '0';
    } else {
      document.getElementsByClassName('TogglerText')[0].innerText = '접기';
      document.getElementsByClassName('TodoList')[0].style.transform = 'translateY(0%)';
      document.getElementsByClassName('TodoList')[0].style.opacity = '1';
    }
  }
  let DelTodo = (i) => {
    let todocopy = todolist.slice();
    todocopy.splice(i,1);
    setTodo(todocopy);
  }
  let Completed = (i) => {
    let todocopy = todolist.slice();
    console.log(i,todocopy);
    todocopy[i].status = "complete";
    setTodo(todocopy);
  }
  let CompletedStyle = {
    textDecoration: 'line-through',
    color: 'rgb(167, 167, 167)'
  }
  const [todolist, setTodo] = useState([]);
  console.log('리렌더간다');
  return (
    <div className="TodoApp">
      <div className="TodoHead">
        <h1>- 투두 리스트 -</h1>
          <p onClick={()=>{GetTodolist()}}>투두 리스트 받아오기!</p>
      </div>
      <div className="TodoBody">
        <div className="SubmitTodo">
          <span>뭘 해야할까?</span>
          <input className="AddTodo" type="text" onKeyPress={()=>EnterPressed()} />
          <button onClick={()=>AddTodo()}>등록!</button>
        </div>
        <div className="Toggler">
          <span className="TogglerTodo">
            해야 할 일<i className="fas fa-running"></i>
          </span>
          <button className="SubmitBtn" onClick={()=>ToggleTodo()}>
            <span className="TogglerText">접기</span><i className="fas fa-chevron-down"></i>
          </button>
        </div>
        <div className="TodoCover">
        <div className="TodoList">
          {
            todolist[0]? 
              todolist.map((e,i)=>{
                return (
                  <p key={`${i + 1}번째`} className="WhatTodo">
                        <span onClick={(e) => { Completed(i) }} style={e.status === "complete" ? CompletedStyle:{}} className="EachTodo">
                          <span className="TodoId" style={e.status === "complete" ? CompletedStyle:{}}>
                            {i + 1}
                          </span>
                          {"번째 할 일 : "}
                          <span  className="TodoTitle">
                            {e.title}
                          </span>
                        </span>
                    <i className="fas fa-times" onClick={() => DelTodo(i)}></i>
                  </p>
                )
              })
              :""
          }
        </div>
        </div>
      </div>
    </div>
  );
}

export default TodoApp;
