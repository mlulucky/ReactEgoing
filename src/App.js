import React, {Component} from "react";
import './App.css';

class Subject extends Component {
// Subject 컴포넌트
  render(){ // 클래스안에 함수는 function 생략
    return ( // 하나의 최상위 태그만 사용 (가장 바깥 태그는 1개)
      <header>
        <h1>WEB</h1>
        world wide web!    
      </header>
    );
  }
}

class TOP extends Component {
  render() {
    return(
      <nav>
            <ul>
                <li><a href="1.html">HTML</a></li>
                <li><a href="2.html">CSS</a></li>
                <li><a href="3.html">JavaScript</a></li>
            </ul>
      </nav>
    );
  }
}

class Content extends Component {
  render(){
    return(
      <article>
        <h2>HTML</h2>
        HTML is HyperText Markup Language.
      </article>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Subject></Subject>
        <TOP></TOP>
        <Content></Content>
      </div>
    );
  }
}


export default App;
