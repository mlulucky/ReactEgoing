import React, {Component} from "react" 

class Subject extends Component {
    // Subject 컴포넌트
      render(){ // 클래스안에 함수는 function 생략
        console.log("Subject render");
        return ( // 하나의 최상위 태그만 사용 (가장 바깥 태그는 1개)
          <header>
            <h1><a onClick={function(e){
                e.preventDefault();
                this.props.onChangePage();
            }.bind(this)}>{this.props.title}</a></h1>
            {/* this 는 Class Subject 컴포넌트
                a 태그 클릭시 Subject 태그의 속성(props) onChangePage 이벤트 함수 실행
            */}
            {this.props.desc}
          </header>
        );
      }
    }

export default Subject;