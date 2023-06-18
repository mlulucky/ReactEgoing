import React, { Component } from "react"

class UpdateContent extends Component {
  // 생성자
  constructor(props) { 
    super(props);
    this.state = {
      title : this.props.data.title, // this == UpdateContent 컴포넌트
      desc : this.props.data.desc,
      id : this.props.data.id
    }
    this.inputFormHandler = this.inputFormHandler.bind(this);
  }

  // 함수
  inputFormHandler(e) {
    this.setState({[e.target.name] : e.target.value});
  }

  render() {
    console.log("UpdateContent render");
    console.log("data",this.props.data);
    return (
      <article>
        <h2>Update</h2>
        <form action="/create" method="post"
          onSubmit={function (e) {
            e.preventDefault(); // form 태그의 submit 버튼 클릭시, submit 이벤트 막기
            // debugger;
            this.props.onSubmit(
              this.state.id,
              this.state.title, 
              this.state.desc);
          }.bind(this)}
        >
          {/* 입력값 수정하기 : 
              1. 🍒onChange 사용
              2. setState 로 사용자 입력값으로 state 업데이트
              3. => 생성자(constructor)를 만들어서 state 를 정의하기
          */}

          {/* 🍒수정하기에 필요한 것 ! 
              수정하는 목록 리스트의 id 값 => input 태그의 value 로 받기
          */}
          <input type="hidden" name="id" value={this.state.id}></input>
          <p>
            <input 
            type="text" 
            name="title" 
            value={this.state.title}
            onChange={this.inputFormHandler}></input>
          </p>
          <p>
            <textarea 
              name="desc"
              value={this.state.desc}
              style={{ resize: "none" }}
              onChange={this.inputFormHandler}
              ></textarea>
          </p>
          <p>
            <button type="submit">제출</button>
          </p>
        </form>
      </article>

    );
  }
}

export default UpdateContent;