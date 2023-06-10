import React, {Component} from "react";

class TOC extends Component {
    render() {
        console.log("TOC render");
        let data = this.props.data; // App.js 의 TOC 컴포넌트 <TOC> 태그의 속성(props) data  
        let list=[];
        data.forEach((d)=> { // d 는 data 배열의 요소
            list.push(<li key={d.id}><a href={`/content/${d.id}`}
            data-id={d.id} 
            
            // 🍒 a 태그에 data-id 속성으로 id 값 주기
            // a 태그의 속성 중 dataset 으로 접근할 수 있다.
            // data-id == e.target.dataset.id
            onClick={function(e){
              console.log("id", e.target.dataset.id);
              console.log("이벤트",e);
              console.log("이벤트 대상", e.target); // e.target : 이벤트가 발생하는 대상(태그)
              e.preventDefault();
              this.props.onChangePage(e.target.dataset.id); // 🍒id 값을 함수 매개변수로 넘기기
            }.bind(this)} // bind() 의 매개변수로 변수를 넣으면, bind 하는 함수 function() 의 매개변수로도 변수를 넘길수 있다. d.id 
            >{d.title}</a></li>)
            //  에러) Each child in a list should have a unique "key" prop.
            //  태그를 자동으로 생성하는 경우에는 각각의 항목에 key 라는 props 를 가져야 한다.
            // key 값으로는 식별자 id 값을 주기 (리액트가 요청하는 에러사항이다.)
        });

      return(
        <nav>
              <ul>
                    {list}
              </ul>
        </nav>
      );
    }
  }

  export default TOC;