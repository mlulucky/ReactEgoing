import React, {Component} from "react";
import './App.css';
import TOC from './components/TOC';
import Subject from "./components/Subject";
import Content from "./components/Content";


class App extends Component {
  constructor(props) { // 컴포넌트 실행될때 렌더보다 먼저실행. 컴포넌트 초기화 
    super(props);
    this.state = {
      subject : {title: "WEB", sub: "World wide web!"},
      content : {title: "HTML", desc: "HTML is HyperText Markup Language."},
      contents : [ // 데이터가 여러개이면 배열로..
        {id:1, title: "HTML", desc: "HTML is for information"},
        {id:2, title: "CSS", desc: "CSS is for design"},
        {id:3, title: "JavaScript", desc: "JavaScript is for interactive"}
      ]
    }
  }

  render() {
    return (
      <div className="App">
        {/* <Subject></Subject> */}
        {/* <Subject title="WEB" desc="world wide web!"></Subject> */}
        <Subject 
        title={this.state.subject.title} 
        desc={this.state.subject.sub}>
        </Subject>
        
        <TOC data={this.state.contents}></TOC>
         {/* 부모컴포넌트 App 의 state (내부정보) 를 하위(자식) 컴포넌트의 props(속성)을 통해 전달하는 것 */}

        <Content 
        title={this.state.content.title} 
        desc={this.state.content.desc}>
        </Content>
      </div>
    );
  }
}


export default App;
