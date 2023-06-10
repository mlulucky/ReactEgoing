import React, {Component} from "react";

class TOC extends Component {
    render() {
        console.log("TOC render");
        let data = this.props.data; // App.js 의 TOC 컴포넌트 <TOC> 태그의 속성(props) data  
        let list=[];
        data.forEach((d)=> { // d 는 data 배열의 요소
            list.push(<li key={d.id}><a href={`/content/${d.id}`}>{d.title}</a></li>)
            //  에러) Each child in a list should have a unique "key" prop.
            //  태그를 자동으로 생성하는 경우에는 각각의 항목에 key 라는 props 를 가져야 한다.
            // key 값으로는 식별자 id 값을 주기 (리액트가 요청하는 에러사항이다.)
        });

      return(
        <nav>
              <ul>
                    {list}
                  {/* <li><a href="1.html">HTML</a></li>
                  <li><a href="2.html">CSS</a></li>
                  <li><a href="3.html">JavaScript</a></li> */}
              </ul>
        </nav>
      );
    }
  }

  export default TOC;