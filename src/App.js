import React, {Component} from "react";
import './App.css';
import TOC from './components/TOC';
import Subject from "./components/Subject";
import Content from "./components/Content";


class App extends Component {
  constructor(props) { // 컴포넌트 실행될때 렌더보다 먼저실행. 컴포넌트 초기화 
    super(props);
    this.state = {
      mode: "welcome",
      selected_content_id : 2, // 기본값 설정
      subject : {title: "WEB", sub: "World wide web!"},
      content : {title: "HTML", desc: "HTML is HyperText Markup Language."},
      welcome : {title: "welcome", desc: "Hello, React!"},
      contents : [ // 데이터가 여러개이면 배열로..
        {id:1, title: "HTML", desc: "HTML is for information"},
        {id:2, title: "CSS", desc: "CSS is for design"},
        {id:3, title: "JavaScript", desc: "JavaScript is for interactive"}
      ]
    }
  }

  render() {
    console.log("this",this); // 🍒render 안에서 this 는 컴포넌트 자신!
    console.log("App render");
    let _title, _desc = null;
    if(this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    }else if(this.state.mode === "read") {
      let i=0;
      while(i<this.state.contents.length) { // while(조건식) // 조건이 참일때까지 반복문
        let data = this.state.contents[i];
        if(data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          break; // while 조건문 종료 => while 문 바깥의 코드 실행
        }
        i++;
      }      
    }

    return (
      <div className="App">
        <Subject 
        title={this.state.subject.title} 
        desc={this.state.subject.sub}
        onChangePage={function(){
          alert("onChagePage 이벤트");
          this.setState({
            mode: "read"
          })
        }.bind(this)}
        >
        </Subject>

        <TOC
        data={this.state.contents}
        onChangePage={function(id){
          // debugger;
          // alert("TOC 이벤트");
          this.setState({
            mode : "read",
            selected_content_id : Number(id) // id 가 "" 문자로 넘어오므로 숫자로 형변환(Number) 
          })
        }.bind(this)}
        ></TOC>
         {/* 부모컴포넌트 App 의 state (내부정보) 를 하위(자식) 컴포넌트의 props(속성)을 통해 전달하는 것 */}

        <Content 
        title={_title} 
        desc={_desc}>
        </Content>
      </div>
    );
  }
}


export default App;
