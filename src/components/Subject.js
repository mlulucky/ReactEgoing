import React, {Component} from "react" 

class Subject extends Component {
    // Subject 컴포넌트
      render(){ // 클래스안에 함수는 function 생략
        return ( // 하나의 최상위 태그만 사용 (가장 바깥 태그는 1개)
          <header>
            {/* <h1>WEB</h1>
            world wide web! */}
            <h1>{this.props.title}</h1>
            {this.props.desc}
          </header>
        );
      }
    }

export default Subject;