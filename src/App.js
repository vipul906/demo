import React, { useState, useRef, createRef, Component } from "react";
//import logo from "./logo.svg";
import Popup from "reactjs-popup";
import SignatureCanvas from "react-signature-canvas";
import "./App.css";
import "./sigCanvas.css";

const style = {
  sigCanva: {
    border: "1px solid black",
    width: "100%",
    minheight: "500px",
  },
};
class App extends Component {
  sigCanvas = createRef();
  state = {
    imageURL: null,
    setImageURL: null,
  };
  clear = () => this.sigCanvas.current.clear();
  save = () => {
    this.setState({
      imageURL: this.sigCanvas.current
        .getTrimmedCanvas()
        .toDataURL("image/png"),
    });
  };
  mydownload = (imageurl) => {
    var img = document.getElementById("imgurl");

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    canvas.width = img.width;
    canvas.height = img.height;

    // ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    var a = document.createElement("a");
    a.href = imageurl; // canvas.toDataURL("image/png");
    a.download = "sample.jpg";
    document.body.appendChild(a);
    a.click();
  };
  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <h1>Welcome To My Website !!!!!</h1>
        <header className="App-header">
          <Popup
            modal
            trigger={<button> Open Signature Pad</button>}
            closeOnDocumentClick={false}>
            {(close) => (
              <>
                <SignatureCanvas
                  penColor="red"
                  ref={this.sigCanvas} //pass our ref into signature component
                  canvasProps={{
                    className: "signatureCanvas",
                  }}
                />
                <button onClick={this.save}>save</button>
                <button onClick={this.clear}>clear</button>
                <button onClick={close}>close</button>
              </>
            )}
          </Popup>
          {this.state.imageURL ? (
            <>
              {" "}
              <img
                src={this.state.imageURL}
                id="imgurl"
                alt="my signature"
                style={{
                  display: "block",
                  margin: "0 auto",
                  border: "1px solid black",
                  background: "white",
                  width: "100px",
                  height: "100px",
                }}
              />
              <br />
              <button onClick={() => this.mydownload(this.state.imageURL)}>
                download
              </button>
              <canvas id="canvas">
                Sorry. Your browser does not support HTML5 canvas element.
              </canvas>
            </>
          ) : null}
        </header>
      </div>
    );
  }
}

export default App;
