import { useEffect, useState } from "react";
import { userRequest, apiUserCheckout, apiUserSignOut } from "../services/users";
import { useNavigate } from "react-router-dom";
import { todoRequest, apiAddTodo, apiGetTodo, apiDeleteTodo } from "../services/todos";

const Todo = () => {
  const nabigate = useNavigate()
  const [nickname, setNickname] = useState('') 

  useEffect(() => {
    (async ()=> {
      await checkAuth();
      await getTodo();
    })()
  }, [])

  // 驗證 token
  const checkAuth = async () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("todo_token="))
      ?.split("=")[1];
      
    
    // set axios defaults authorization
    // axios.defaults.headers.common['Authorization'] = token;

    // set custom instance authorization
    userRequest.defaults.headers.common['Authorization'] = token;
    todoRequest.defaults.headers.common['Authorization'] = token;


    try {
      const { data } = await apiUserCheckout()
      console.log('auth驗證成功')
      const { nickname } = data;
      setNickname(nickname)
    } catch(error) {
      // error
      nabigate('/auth/login')
    }
  }

  // 登出
  const signOut = async () => {
    try {
      const { data } = await apiUserSignOut()
      nabigate('/auth/login')
    } catch(error) {
      // error
    }
  }

  // todos:
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])

  // 新增待辦
  const addTodo = async () => {
    try {
      const {data} = await apiAddTodo({
        content: todo
      })
      getTodo()
      setTodo('')
    } catch(error) {
      // error
    }
  }

  // 取得待辦
  const getTodo = async () => {
    try {
      const {data} = await apiGetTodo()
      console.log('取得todod', data.data)
      setTodos(data.data)
    } catch(error) {
      // error
    }
  }

  // 移除待辦
  const deleteTodo = async (id) => {
    try {
      await apiDeleteTodo(id)
      setTodos(
        todos.filter((item)=>item.id !== id)
      )
    } catch(error) {
      // error
    }
  }

  return (
    <>
      <div id="todoListPage" className="bg-half">
        <nav>
          <h1>
            <a href="#">ONLINE TODO LIST</a>
          </h1>
          <ul className="nav_menu">
            <li>
              <span className="nav_text">{nickname}</span>
            </li>
            <li>
              <button type="button" className="nav_btn"
              onClick={()=>{
                signOut()
              }}>登出</button>
            </li>
          </ul>
        </nav>
        <div className="conatiner todoListPage vhContainer">
          <div className="todoList_Content">
            <div className="inputBox">
              <input type="text" placeholder="請輸入待辦事項" 
              value={todo}
              onChange={(e)=>{
                setTodo(e.target.value)
              }}/>
              <a href="#" onClick={(e)=>{
                e.preventDefault();
                addTodo();
              }}>
                <i className="fa fa-plus"></i>
              </a>
            </div>
            <div className="todoList_list">
              <ul className="todoList_tab">
                <li>
                  <a href="#" className="active">
                    全部
                  </a>
                </li>
                <li>
                  <a href="#">待完成</a>
                </li>
                <li>
                  <a href="#">已完成</a>
                </li>
              </ul>
              <div className="todoList_items">
                <ul className="todoList_item">
                  {
                    todos.map((item)=>{
                      return (
                        <li key={item.createTime}>
                          <label className="todoList_label">
                            <input
                              className="todoList_input"
                              type="checkbox"
                              value="true"
                            />
                            <span>{item.content}</span>
                          </label>
                          <a href="#">
                            <i className="fa-sharp fa-solid fa-trash" 
                            onClick={()=>{
                              deleteTodo(item.id)
                            }}></i>
                          </a>
                        </li>
                      )
                    })
                  }
                </ul>
                <div className="todoList_statistics">
                  <p> 5 個已完成項目</p>
                  <a href="#">清除已完成項目</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
