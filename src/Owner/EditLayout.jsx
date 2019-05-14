import React, { Component } from "react";
import { connect } from "react-redux";
import "../../css/edit-layout.css";
import Chair from "./DraggableChair.jsx";
import Table from "./DraggableTable.jsx";
let path = "http://localhost:4000/";

class UnconnectedEditLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: undefined,
      type: "",
      copied: "",
      clickedX: 0,
      clickedY: 0,
      deltaX: 0,
      deltaY: 0,
      x: 0,
      y: 0,
      id: "",
      chairs: [],
      tables: []
    };
  }

  componentDidMount = () => {
    this.addChair();
    this.addTable();
  };

  generateId = () => {
    return "" + Math.floor(Math.random() * 1000000);
  };

  click = (index, evt, type, copied, x, y, id) => {
    this.setState({
      clicked: index,
      type: type,
      copied: copied,
      clickedX: evt.clientX,
      clickedY: evt.clientY,
      x: x,
      y: y,
      id: id
    });
    if (!copied && type === "chair") {
      this.addChair();
    }
    if (!copied && type === "table") {
      this.addTable();
    }
  };

  move = evt => {
    if (this.state.clicked !== undefined) {
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
      x: 0,
      y: 0,
      id: "",
      type: "",
      copied: "",
      chairs: chairs,
      tables: tables
    });
  };

  addChair = () => {
    let newChair = { id: this.generateId(), x: 1010, y: 0, taken: false };
    this.setState({ chairs: this.state.chairs.concat(newChair) });
  };

  addTable = () => {
    let newTable = { id: this.generateId(), x: 1005, y: 60 };
    this.setState({ tables: this.state.tables.concat(newTable) });
  };

  submitLayout = () => {
    let data = new FormData();
    let chairs = this.state.chairs.slice();
    chairs.splice(-1, 1);
    let tables = this.state.tables.slice();
    tables.splice(-1, 1);
    data.append("chairs", JSON.stringify(chairs));
    data.append("tables", JSON.stringify(tables));
    data.append("cafeId", this.props.cafeId);
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
          localStorage.setItem(this.props.username + "-edit", "false");
          this.props.dispatch({ type: "done-edit" });
        }
      });
  };

  render = () => {
    console.log(this.state.x, this.state.y);
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
                id={c.id}
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
                id={c.id}
              />
            );
          })}
        </div>
        <div className="instructions">
          <h2 className="instructions-title">Instructions: </h2>
          <p>
            Drag and drop chairs and tables to roughly match the layout of your
            cafe.
          </p>
          <p className="second-p">
            Make sure to add the exact amount of chairs you have available.
          </p>
          <div className="edit-button-container">
            <button className="submit-button" onClick={this.submitLayout}>
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  };
}

let mapStateToProps = st => {
  return {
    username: st.username,
    cafeId: st.cafeId
  };
};

let EditLayout = connect(mapStateToProps)(UnconnectedEditLayout);

export default EditLayout;
