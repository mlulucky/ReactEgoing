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
      _title = this.state.contents[0].title;
      _desc = this.state.contents[0].desc;
    }

    return (
      <div className="App">
        {/* <Subject></Subject> */}
        {/* <Subject title="WEB" desc="world wide web!"></Subject> */}
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

        {/* <header>
          <h1><a href="/" onClick={function(e){ // e : 이벤트 객체. 클릭이벤트가 발생하는 태그의 이벤트 정보
              // alert("hi"); // 클릭시 함수실행
              
              // console.log("onClick this", this); // this 는 undefined
              console.log(e);
              // debugger; 브라우저가 실행을 멈추고, sources 로 이동
              e.preventDefault(); 
              // 클릭 후 a 태그의 href 로 이동되면서 페이지가 리로드 된다.
              // html 태그의 기본동작을 막는다. (a 태그가 페이지 이동되는 기본동작을 막음)
            
              // return;

              // this.state.mode = "read"; // 에러) 👀 컴포넌트의 mode 변경하기! 
              // * onClick 이 실행되는 함수 안에서는 this 컴포넌트 자신이 아니라. 정의되지 않은 값
              // 🍒해결방법 => (함수).bind(this)
              // 🍒해결방법  => this.setState({}) 함수 사용 (컴포넌트 App 의 state 값 변경)
              this.setState({
                mode: "read"
              });
               
          }.bind(this)}>{this.state.subject.title}</a></h1> // 여기서 this 는 컴포넌트 App 
          {this.state.subject.sub}
        </header> */}
        
        <TOC data={this.state.contents}></TOC>
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
