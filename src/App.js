import React, { Component } from "react";
import './App.css';
import TOC from './components/TOC';
import Subject from "./components/Subject";
import ReadContent from "./components/ReadContent";
import Control from "./components/Control";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";

class App extends Component {
  constructor(props) { // 컴포넌트 실행될때 렌더보다 먼저실행. 컴포넌트 초기화 
    super(props);
    this.state = {
      mode: "welcome",
      selected_content_id: 2, // 기본값 설정
      subject: { title: "WEB", sub: "World wide web!" },
      content: { title: "HTML", desc: "HTML is HyperText Markup Language." },
      welcome: { title: "welcome", desc: "Hello, React!" },
      contents: [ // 데이터가 여러개이면 배열로..
        { id: 1, title: "HTML", desc: "HTML is for information" },
        { id: 2, title: "CSS", desc: "CSS is for design" },
        { id: 3, title: "JavaScript", desc: "JavaScript is for interactive" }
      ]
    }
  }

  getReadConent() {
    let i = 0;
    while (i < this.state.contents.length) { // while(조건식) // 조건이 참일때까지 반복문
      let data = this.state.contents[i];
      console.log("data.id", data.id);
      // 🍒 data.id 1,2,3 에서 유저가 선택하는 data 가 같으면
      // 유저가 data.id 3 목록을 선택하면 data.id 가 3인 data 의 title 제목과 desc 내용을 _content 에 적용하여 보여준다. 
      if (data.id === this.state.selected_content_id) {
        // _title = data.title;
        // _desc = data.desc;
        return data; // return 함수실행 종료되고 값 반환
        break; // 👀 while 조건문 종료 => while 문 바깥의 코드 실행 
        // 👀 return 문이 실행되면 함수가 종료되기 때문에 break 문 실행되지 않고
        // while 문 반복도 중지되고 while 문 바깥의 코드 실행   
      }
      i++;
    }
  }

  getContent() {
    console.log("this", this); // 🍒render 안에서 this 는 컴포넌트 자신!
    console.log("App render"); // this == App 
    let _title, _desc, _content = null;
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _content = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if (this.state.mode === "read") {
      // 선택한 목록을 화면에 보여주는(읽어주는 R) 코드
      const content = this.getReadConent();  
      _content = <ReadContent title={content.title} desc={content.desc}></ReadContent>

    } else if (this.state.mode === "create") {
      _content = <CreateContent
        onSubmit={function (_title, _desc) {
          // TOC 컴포넌트 리스트에 목록 추가
          let contentsLength = this.state.contents.length;
          contentsLength += 1;
          // 원본을 바꾸지 않고 배열을 생성, 수정하는 방법
          // 1. Array.from(new배열).push(요소) : new배열을 만들고 요소를 push 하는 법
          // 2. 배열.concat(요소) : concat 은 원본 배열은 그대로이고, 새로운 배열을 만들어서 요소를 추가하는 법
          let newContents = this.state.contents.concat(
            { id: contentsLength, title: _title, desc: _desc } // 추가할 오브젝트(객체)
          )
          // console.log("newContents", newContents);
          // title, desc 는 form 태그에서 입력한 값 => onSubmit 함수의 매개변수로 받기!
          this.setState({ // 추가한 새로운 배열(newContents)을 state 의 content 로 바꾸기
            contents: newContents,
            mode : "read",
            selected_content_id : contentsLength
          })
        }.bind(this)}
      ></CreateContent>
    } else if (this.state.mode === "update") {
        _content = <UpdateContent
        data = {this.getReadConent()}
        onSubmit={function (_id, _title, _desc) {
          // 배열 복제하는 법 1. Array.from (배열) 2. 배열.slice( ); 3. 배열.concat( );
          // Array.from -> forEach 로 배열 요소를 수정하려고 했으나
          // forEach 에서는 배열을 순회, 수정은 하지만 원본배열을 반환하지 않아서, 수정배열을 반환하지 않음
          // 따라서 map 메서드를 이용해서 수정된 배열을 반환시키기! 
          // 배열.map() : 배열을 새로 생성 + 수정 => 수정된 배열 반환
          const contArr =  this.state.contents.map((cont)=>{
            if(cont.id == _id) {
              cont = {id: _id, title: _title, desc : _desc}; 
              return cont
            }
             return cont 
          });
          this.setState({ 
            contents: contArr,
            mode : "read" 
          })
        }.bind(this)}
      ></UpdateContent>
    } 
    return _content;
  }

  render() {
    // return 전 render 에 코드가 많아서 함수로 묶어서 호출
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          desc={this.state.subject.sub}
          onChangePage={function () {
            alert("onChagePage 이벤트");
            this.setState({
              mode: "read"
            })
          }.bind(this)}
        >
        </Subject>
        <Control
          onChangeSetMode={function (_mode) {
            if(_mode === "delete") {
              if(window.confirm("정말 삭제하겠습니까?")) {
                // 배열.filter() : 조건(boolean)에 맞는 요소만 남긴 새로운 배열을 반환
                const contArr = this.state.contents.filter((cont) => 
                // 선택한 id 값이 아닌 요소만 남긴다. (선택한 id 값은 배열에서 제외 - delete 효과)
                cont.id !== this.state.selected_content_id); 
                
                this.setState({
                  mode: "welcome",
                  contents : contArr
                });
                alert("삭제 성공!");
              }
            } else {
              this.setState({
                mode : _mode
              });
            }
          }.bind(this)}></Control>
        <TOC
          data={this.state.contents}
          onChangePage={function (id) {
            // debugger;
            // alert("TOC 이벤트");
            this.setState({
              mode: "read",
              selected_content_id: Number(id) // id 가 "" 문자로 넘어오므로 숫자로 형변환(Number) 
            })
          }.bind(this)}
        ></TOC>
        {/* 부모컴포넌트 App 의 state (내부정보) 를 하위(자식) 컴포넌트의 props(속성)을 통해 전달하는 것 */}

        {/* {_content}  */}
        {this.getContent()}
        {/* 목록리스트와 crud 리스트를 클릭 시, 화면에 보여지는 내용변경 위해 컴포넌트를 변수로 저장 */}

      </div>
    );
  }
}


export default App;
