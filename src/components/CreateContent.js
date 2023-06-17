import React, {Component} from "react"

class CreateContent extends Component {
    render(){
        console.log("CreateContent render");
        
      return(
        <article>
          <h2>Create</h2>
          <form action="/create" method="post"
            onSubmit={function(e){
              e.preventDefault(); // form 태그의 submit 버튼 클릭시, submit 이벤트 막기
              // debugger;
              this.props.onSubmit(e.target.title.value, e.target.desc.value);
            }.bind(this)}
          >
            <p><input type="text" name="title" placeholder="title"></input></p>
            <p>
              <textarea name="desc" placeholder="desc" style={{resize : "none"}}></textarea>
            </p>
            <p>
              <button type="submit">제출</button>
            </p>
          </form>
        </article>
        
      );
    }
  }

  export default CreateContent;