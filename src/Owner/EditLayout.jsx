import React, { Component } from "react";
import { connect } from "react-redux";
import "../../css/edit-layout.css";
import Chair from "./DraggableChair.jsx";
import Table from "./DraggableTable.jsx";
let path = "http://localhost:4000/";

class UnconnectedEditLayout extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      clicked: undefined,
      type: "",
      id: "",
      out: false,
      clickedX: 0,
      clickedY: 0,
      deltaX: 0,
      deltaY: 0,
      chairs: [],
      tables: []
    };
  }

  generateId = () => {
    return "" + Math.floor(Math.random() * 1000000);
  };

  componentDidMount = () => {
    fetch(path + "cafe-info", {
      credentials: "include"
    })
      .then(header => {
        return header.text();
      })
      .then(body => {
        let parsed = JSON.parse(body);
        if (parsed.success) {
          let chairs = parsed.chairs;
          let tables = parsed.tables;
          if (chairs !== undefined && tables !== undefined) {
            this.setState({ chairs: chairs, tables: tables });
          }
        }
      });
  };

  click = (index, evt, type, id) => {
    this.setState({
      clicked: index,
      type: type,
      id: id,
      clickedX: evt.clientX,
      clickedY: evt.clientY
    });
  };

  move = evt => {
    let element = this.myRef.current;
    let cor = element.getBoundingClientRect();
    if (this.state.clicked !== undefined) {
      if (
        evt.clientX < cor.left + 20 ||
        evt.clientX > cor.left + 20 + 1000 ||
        evt.clientY < cor.top ||
        evt.clientY > cor.top + 730
      ) {
        this.setState({ out: true });
      } else {
        this.setState({ out: false });
      }
      this.setState({
        deltaX: evt.clientX - this.state.clickedX,
        deltaY: evt.clientY - this.state.clickedY
      });
    }
  };

  mouseUp = evt => {
    let chairs = this.state.chairs.map((c, i) => {
      if (i !== this.state.clicked || this.state.type === "table") return c;
      return { ...c, x: c.x + this.state.deltaX, y: c.y + this.state.deltaY };
    });
    let tables = this.state.tables.map((c, i) => {
      if (i !== this.state.clicked || this.state.type === "chair") return c;
      return { ...c, x: c.x + this.state.deltaX, y: c.y + this.state.deltaY };
    });

    let element = this.myRef.current;
    let cor = element.getBoundingClientRect();

    if (
      evt.clientX < cor.left + 20 ||
      evt.clientX > cor.left + 20 + 1000 ||
      evt.clientY < cor.top ||
      evt.clientY > cor.top + 730
    ) {
      if (this.state.type === "chair") {
        chairs = chairs.filter(chair => {
          return chair.id !== this.state.id;
        });
      }
      if (this.state.type === "table") {
        tables = tables.filter(table => {
          return table.id !== this.state.id;
        });
      }
    }

    this.setState({
      clicked: undefined,
      clickedX: 0,
      clickedY: 0,
      deltaX: 0,
      deltaY: 0,
      type: "",
      id: "",
      out: false,
      chairs: chairs,
      tables: tables
    });
  };

  addChair = evt => {
    let id = this.generateId();
    let newChair = { id: id, x: 1010, y: 0, taken: false };
    this.setState({ chairs: this.state.chairs.concat(newChair) });
    this.click(this.state.chairs.length, evt, "chair", id);
  };

  addTable = evt => {
    let id = this.generateId();
    let newTable = { id: id, x: 1005, y: 60, out: false };
    this.setState({ tables: this.state.tables.concat(newTable) });
    this.click(this.state.tables.length, evt, "table", id);
  };

  submitLayout = () => {
    let data = new FormData();
    let chairs = this.state.chairs;
    let tables = this.state.tables;
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
          this.props.dispatch({ type: "done-edit" });
        }
      });
  };

  render = () => {
    return (
      <div
        onMouseUp={this.mouseUp}
        onMouseMove={this.move}
        onMouseLeave={this.mouseUp}
        className="drag-drop"
      >
        <div ref={this.myRef} className="edit-layout">
          {this.state.chairs.map((c, i) => {
            let deltaX = 0;
            let deltaY = 0;
            let out = false;
            if (i === this.state.clicked && this.state.type === "chair") {
              deltaX = this.state.deltaX;
              deltaY = this.state.deltaY;
              out = this.state.out;
            }
            return (
              <Chair
                x={c.x + deltaX}
                y={c.y + deltaY}
                click={this.click}
                index={i}
                id={c.id}
                out={out}
              />
            );
          })}
          {this.state.tables.map((c, i) => {
            let deltaX = 0;
            let deltaY = 0;
            let out = false;
            if (i === this.state.clicked && this.state.type === "table") {
              deltaX = this.state.deltaX;
              deltaY = this.state.deltaY;
              out = this.state.out;
            }
            return (
              <Table
                x={c.x + deltaX}
                y={c.y + deltaY}
                click={this.click}
                index={i}
                id={c.id}
                out={out}
              />
            );
          })}
        </div>
        <div className="edit-images">
          <img
            className="edit-chair"
            onMouseDown={this.addChair}
            draggable={false}
            src="/chair.png"
            height="50px"
          />
          <img
            className="edit-table"
            onMouseDown={this.addTable}
            draggable={false}
            src="/table.png"
            height="60px"
          />
        </div>
        <div className="instructions">
          <h2 className="instructions-title">Instructions: </h2>
          <p>
            Drag and drop chairs <img src="/chair.png" height="10px" /> and
            tables <img src="/table.png" height="10px" /> to match the layout of
            your café.
          </p>
          <p className="second-p">
            Make sure to add the exact amount of chairs you have available.
          </p>
          <p className="second-p">
            Drop an element outside of the border to delete it.
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
