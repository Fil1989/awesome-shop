import { Component } from "react";

class Example extends Component {
  render() {
    return (
      <>
        <h1>Example </h1>
        <video controls width="250">
          <source
            src="blob:https://www.youtube.com/7cf48a5c-7924-48a8-b60f-2a5e5e26135a"
            type="video/webm"
          />
          <source
            src="blob:https://www.youtube.com/7cf48a5c-7924-48a8-b60f-2a5e5e26135a"
            type="video/mp4"
          />
          Sorry, your browser doesn't support embedded videos.
        </video>
      </>
    );
  }
}
export default Example;
