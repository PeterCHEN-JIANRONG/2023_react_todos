import { useEffect, useState } from "react";
import { userRequest, apiUserCheckout, apiUserSignOut } from "../services/users";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const nabigate = useNavigate()
  const [nickname, setNickname] = useState('') 

  useEffect(() => {
    checkAuth();
  }, [])

  // 驗證 token
  const checkAuth = async () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("todo_token="))
      ?.split("=")[1];
      
    // Alter defaults after instance has been created
    userRequest.defaults.headers.common['Authorization'] = token;

    try {
      const { data } = await apiUserCheckout()
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
              <input type="text" placeholder="請輸入待辦事項" />
              <a href="#">
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
                  <li>
                    <label className="todoList_label">
                      <input
                        className="todoList_input"
                        type="checkbox"
                        value="true"
                      />
                      <span>把冰箱發霉的檸檬拿去丟</span>
                    </label>
                    <a href="#">
                      <i className="fa-sharp fa-solid fa-trash"></i>
                    </a>
                  </li>
                  <li>
                    <label className="todoList_label">
                      <input
                        className="todoList_input"
                        type="checkbox"
                        value="true"
                      />
                      <span>打電話叫媽媽匯款給我</span>
                    </label>
                    <a href="#">
                      <i className="fa fa-times"></i>
                    </a>
                  </li>
                  <li>
                    <label className="todoList_label">
                      <input
                        className="todoList_input"
                        type="checkbox"
                        value="true"
                      />
                      <span>整理電腦資料夾</span>
                    </label>
                    <a href="#">
                      <i className="fa fa-times"></i>
                    </a>
                  </li>
                  <li>
                    <label className="todoList_label">
                      <input
                        className="todoList_input"
                        type="checkbox"
                        value="true"
                      />
                      <span>繳電費水費瓦斯費</span>
                    </label>
                    <a href="#">
                      <i className="fa fa-times"></i>
                    </a>
                  </li>
                  <li>
                    <label className="todoList_label">
                      <input
                        className="todoList_input"
                        type="checkbox"
                        value="true"
                      />
                      <span>約vicky禮拜三泡溫泉</span>
                    </label>
                    <a href="#">
                      <i className="fa fa-times"></i>
                    </a>
                  </li>
                  <li>
                    <label className="todoList_label">
                      <input
                        className="todoList_input"
                        type="checkbox"
                        value="true"
                      />
                      <span>約ada禮拜四吃晚餐</span>
                    </label>
                    <a href="#">
                      <i className="fa fa-times"></i>
                    </a>
                  </li>
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
