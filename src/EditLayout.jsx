import React, { Component } from "react";
import { connect } from "react-redux";
import "../css/edit-layout.css";
import Chair from "./DraggableChair.jsx";
import Table from "./DraggableTable.jsx";
let path = "http://demo5595251.mockable.io/";

class UnconnectedEditLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: undefined,
      type: "",
      clickedX: 0,
      clickedY: 0,
      deltaX: 0,
      deltaY: 0,
      chairs: [],
      tables: []
    };
  }

  componentDidMount = () => {
    this.addChair();
    this.addTable();
  };

  click = (index, evt, type, copied) => {
    this.setState({
      clicked: index,
      type: type,
      clickedX: evt.clientX,
      clickedY: evt.clientY
    });
    console.log(this.state.type);
    if (!copied && type === "chair") {
      this.addChair();
    }
    if (!copied && type === "table") {
      this.addTable();
    }
  };

  move = evt => {
    if (this.state.clicked !== undefined && evt.clientX < 970) {
      this.setState({
        deltaX: evt.clientX - this.state.clickedX,
        deltaY: evt.clientY - this.state.clickedY
      });
    }
  };

  mouseUp = () => {
    let chairs = this.state.chairs.map((c, i) => {
      if (i !== this.state.clicked || this.state.type === "table") return c;
      return { ...c, x: c.x + this.state.deltaX, y: c.y + this.state.deltaY };
    });

    let tables = this.state.tables.map((c, i) => {
      if (i !== this.state.clicked || this.state.type === "chair") return c;
      return { ...c, x: c.x + this.state.deltaX, y: c.y + this.state.deltaY };
    });

    this.setState({
      clicked: undefined,
      clickedX: 0,
      clickedY: 0,
      deltaX: 0,
      deltaY: 0,
      chairs: chairs,
      tables: tables
    });
  };

  addChair = () => {
    let newChair = { id: 345, x: 1020, y: 20 };
    this.setState({ chairs: this.state.chairs.concat(newChair) });
  };

  addTable = () => {
    let newTable = { id: 345, x: 1020, y: 120 };
    this.setState({ tables: this.state.tables.concat(newTable) });
  };

  submitLayout = () => {
    let data = new FormData();
    data.append("chairs", this.state.chairs);
    data.append("tables", this.state.tables);
    fetch(path + "add-layout", {
      method: "POST",
      body: data,
      credentials: "include"
    })
      .then(header => {
        return header.text();
      })
      .then(body => {
        let parsed = JSON.parse(body);
        if (parsed.success) {
          this.props.dispatch({ type: "done-edit" });
        }
      });
  };

  render = () => {
    return (
      <div className="drag-drop">
        <div
          onMouseUp={this.mouseUp}
          onMouseMove={this.move}
          onMouseLeave={this.mouseUp}
          className="edit-layout"
        >
          {this.state.chairs.map((c, i) => {
            let deltaX = 0;
            let deltaY = 0;
            if (i === this.state.clicked && this.state.type === "chair") {
              deltaX = this.state.deltaX;
              deltaY = this.state.deltaY;
            }
            return (
              <Chair
                x={c.x + deltaX}
                y={c.y + deltaY}
                click={this.click}
                index={i}
              />
            );
          })}
          {this.state.tables.map((c, i) => {
            let deltaX = 0;
            let deltaY = 0;
            if (i === this.state.clicked && this.state.type === "table") {
              deltaX = this.state.deltaX;
              deltaY = this.state.deltaY;
            }
            return (
              <Table
                x={c.x + deltaX}
                y={c.y + deltaY}
                click={this.click}
                index={i}
              />
            );
          })}
        </div>
        <div className="instructions">
          <h3>Instructions: </h3>
          <p>
            Drag and drop chairs and tables to roughly match the layout of your
            café.
          </p>
          <p>Make sure to add the exact amount of chairs you have available.</p>
          <button onClick={this.submitLayout}>Submit</button>
        </div>
      </div>
    );
  };
}

let EditLayout = connect()(UnconnectedEditLayout);

export default EditLayout;
