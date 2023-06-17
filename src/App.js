import React, {Component} from "react";
import './App.css';
import TOC from './components/TOC';
import Subject from "./components/Subject";
import ReadContent from "./components/ReadContent";
import Control from "./components/Control";
import CreateContent from "./components/CreateContent";


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
    let _title, _desc, _content = null;
    if(this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _content = <ReadContent title={_title} desc={_desc}></ReadContent>
    }else if(this.state.mode === "read") {
      let i=0;
      while(i<this.state.contents.length) { // while(조건식) // 조건이 참일때까지 반복문
        let data = this.state.contents[i];
        if(data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          _content = <ReadContent title={_title} desc={_desc}></ReadContent>
          break; // while 조건문 종료 => while 문 바깥의 코드 실행
        }
        i++;
      }      
    } else if(this.state.mode === "create") {
      _content = <CreateContent 
        onSubmit={function(_title, _desc){
          // TOC 컴포넌트 리스트에 목록 추가
          let contentsLength = this.state.contents.length;
          contentsLength+=1;

          // 원본을 바꾸지 않고 배열을 생성, 수정하는 방법
          // 1. Array.from(new배열).push(요소) : new배열을 만들고 요소를 push 하는 법
          // 2. 배열.concat(요소) : concat 은 원본 배열은 그대로이고, 새로운 배열을 만들어서 요소를 추가하는 법
          let newContents = this.state.contents.concat(
            {id: contentsLength, title: _title, desc: _desc} // 추가할 오브젝트(객체)
          )
          console.log("newContents", newContents);
          // title, desc 는 form 태그에서 입력한 값 => onSubmit 함수의 매개변수로 받기!
          this.setState ({ // 추가한 새로운 배열(newContents)을 state 의 content 로 바꾸기
            contents : newContents
          })
        }.bind(this)}
      ></CreateContent>
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
        <Control
        onChangeSetMode={function(_mode){
          this.setState({
            mode: _mode
          })
        }.bind(this)}></Control>
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


        {_content} 
        {/* 목록리스트와 crud 리스트를 클릭 시, 화면에 보여지는 내용변경 위해 컴포넌트를 변수로 저장 */}

      </div>
    );
  }
}


export default App;
