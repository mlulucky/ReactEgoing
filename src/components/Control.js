import React, {Component} from "react" 

class Control extends Component {
      render(){ // 클래스안에 함수는 function 생략
        console.log("Control render");
        return ( // 하나의 최상위 태그만 사용 (가장 바깥 태그는 1개)
        <ul>
          <li>
            <a href="/create"
             onClick={function(e){
              e.preventDefault();
            this.props.onChangeSetMode("create");
          }.bind(this)}>create</a>
          </li>

          <li>
            <a href="/update" 
            onClick={function(e){
            e.preventDefault();
            this.props.onChangeSetMode("update");
          }.bind(this)}>update</a>
          </li>
          
          <li>
            <input 
            onClick={function(e){
            e.preventDefault();
            this.props.onChangeSetMode("delete");
          }.bind(this)} type="button" value="delete"></input>
          </li>
        </ul>
        );
      }
    }

export default Control;