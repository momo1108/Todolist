import React, { useState } from 'react';
import axios from 'axios';
import './TodoApp.css';

function TodoApp() {
  const [todolist, setTodo] = useState([]);
  const [page, setPage] = useState(0);
  let GetTodolist = (e) => {
    axios.get('https://killsanghyuck.github.io/prography_5th_front/todoDummy.json')
      .then((res) => {
        setTodo(res.data.body);
      })
      .catch((err) => {
        document.write(err);
      })
  }
  let EnterPressed = () => {
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
    if (!todotext) {
      alert('내용을 입력하세요!');
      return;
    }
    todocopy.push({ title: todotext, status: "todo" });
    setTodo(todocopy);
    document.getElementsByClassName('AddTodo')[0].value = "";
  }
  let ToggleTodo = () => {
    document.getElementsByClassName('fa-chevron-down')[0].classList.toggle('IconClicked');
    let text = document.getElementsByClassName('TogglerText')[0].innerText;
    if (text === '접기') {
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
    todocopy.splice(i, 1);
    setTodo(todocopy);
  }
  let Completed = (i) => {
    let todocopy = todolist.slice();
    todocopy[i].status = "complete";
    setTodo(todocopy);
  }
  let MovePage = (e) => {
    if(e){
      if((page + 1)===Math.ceil(todolist.length / 12)){
        alert('마지막 페이지입니다!');
      } else {
        setPage(page+1);
      }
    } else {
      if(page===0){
        alert('첫번째 페이지입니다!');
      } else {
        setPage(page-1);
      }
    }
  }
  let CompletedStyle = {
    textDecoration: 'line-through',
    color: 'rgb(167, 167, 167)'
  }
  console.log('리렌더간다');
  return (
    <div className="TodoApp">
      <div className="TodoHead">
        <h1>- 투두 리스트 -</h1>
        <p onClick={() => { GetTodolist() }}>투두 리스트 받아오기!</p>
      </div>
      <div className="TodoBody">
        <div className="SubmitTodo">
          <span>뭘 해야할까?</span>
          <input className="AddTodo" type="text" onKeyPress={() => EnterPressed()} />
          <button onClick={() => AddTodo()}>등록!</button>
        </div>
        <div className="Toggler">
          <span className="TogglerTodo">
            해야 할 일<i className="fas fa-running"></i>
          </span>
          <button className="SubmitBtn" onClick={() => ToggleTodo()}>
            <span className="TogglerText">접기</span><i className="fas fa-chevron-down"></i>
          </button>
        </div>
        <div className="TodoCover">
          <div className="TodoList">
            {
              todolist[0] ?
                todolist.slice((12 * page), (12 * (page + 1))).map((e, i) => {
                  return (
                    <div key={`${(12 * page) + i + 1}번째`} className="WhatTodo">
                      <span onClick={(e) => { Completed((12 * page) + i) }} style={e.status === "complete" ? CompletedStyle : {}} className="EachTodo">
                        <span className="TodoId" style={e.status === "complete" ? CompletedStyle : {}}>
                          {(12 * page) + i + 1}
                        </span>
                        {"번째 할 일 : "}
                        <span className="TodoTitle">
                          {e.title}
                        </span>
                      </span>
                      <div className="IconBox" onClick={() => DelTodo((12 * page) + i)}><i className="fas fa-times"></i></div>
                    </div>
                  )
                })
                : ""
            }
          </div>
          {
            todolist[0] ?
              <div className="TodoPage">
                <div className="Arrows" onClick={()=>{MovePage(false)}}><i className="fas fa-reply"></i></div>
                <span className="PageNum">{(page + 1) + " / " + Math.ceil(todolist.length / 12)}</span>
                <div className="Arrows" onClick={()=>{MovePage(true)}}><i className="fas fa-share"></i></div>
              </div>
              : ""
          }
        </div>
      </div>
    </div>
  );
}

export default TodoApp;
