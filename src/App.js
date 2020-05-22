import React from "react";
import "./App.css";

function App() {
  return <WorkoutTracker />;
}

class WorkoutTracker extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      updated: false,
      workoutObjects: [],
    };
  }

  handleClickName(index) {
    const newWObj = this.state.workoutObjects.slice();
    if (window.confirm("Do you want to change the NAME of this exercise?")) {
      newWObj[index].name = prompt("What is the new name for this exercise?");
      this.setState({ workoutObjects: newWObj });
    }
  }

  handleClickRepsSets(index) {
    const newWObj = this.state.workoutObjects.slice();
    if (
      window.confirm(
        "Do you want to change the number of SETS of this exercise?"
      )
    ) {
      newWObj[index].sets = prompt("What is the new name for this exercise?");
      this.setState({ workoutObjects: newWObj });
    }
    if (
      window.confirm(
        "Do you want to change the number of REPS for this exercise?"
      )
    ) {
      newWObj[index].reps = prompt(
        "What is the new rep quantity this exercise?"
      );
      this.setState({ workoutObjects: newWObj });
    }
  }

  handleClickDesc(index) {
    const newWObj = this.state.workoutObjects.slice();
    if (
      window.confirm("Do you want to change the DESCRIPTION of this exercise?")
    ) {
      newWObj[index].desc = prompt(
        "What is the new description for this exercise?"
      );
      this.setState({ workoutObjects: newWObj });
    }
  }

  handleClickRemove(index) {
    var newObj = this.state.workoutObjects.slice();
    if (window.confirm("Are you sure you want to delete this exercise?")) {
      newObj.splice(index, 1);
      for (var i = index; i < newObj.length; i++) {
        newObj[i].index = newObj[i].index - 1;
      }
      this.setState({ workoutObjects: newObj });
      const dataHere = newObj;
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataHere),
      };
      fetch("/addEntry", requestOptions);
    }
  }

  handleClick(index) {
    const willBeEdited = window.confirm("Do you want to edit this?");
    const newWObj = this.state.workoutObjects.slice();

    if (willBeEdited) {
      //Change name
      if (window.confirm("Do you want to change the NAME of this exercise?")) {
        newWObj[index].name = prompt("What is the new name for this exercise?");
        this.setState({ workoutObjects: newWObj });
      }
      //Change reps
      if (
        window.confirm(
          "Do you want to change the number of REPS for this exercise?"
        )
      ) {
        newWObj[index].reps = prompt(
          "What is the new rep quantity this exercise?"
        );
        this.setState({ workoutObjects: newWObj });
      }
      //Change sets
      if (
        window.confirm(
          "Do you want to change the number of SETS of this exercise?"
        )
      ) {
        newWObj[index].sets = prompt(
          "What is the new set quantity for this exercise?"
        );
        this.setState({ workoutObjects: newWObj });
      }
      //Change desc
      if (
        window.confirm(
          "Do you want to change the DESCRIPTION of this exercise?"
        )
      ) {
        newWObj[index].desc = prompt(
          "What is the new description for this exercise?"
        );
        this.setState({ workoutObjects: newWObj });
      }
    }
  }
  async initializeWorkouts() {
    const body = await fetch("/getdata");
    const jsons = await body.json();
    this.setState({ workoutObjects: jsons });
    this.setState({ updated: true });
  }

  renderWorkouts() {
    if (!this.state.updated) {
      this.initializeWorkouts();
      this.setState({ updated: true });
    }
    return (
      <div className="workoutsContainer">
        {this.state.workoutObjects.map((n) => (
          <Workout
            name={n.name}
            reps={n.reps}
            sets={n.sets}
            desc={n.desc}
            index={n.index}
            onClickName={() => this.handleClickName(n.index)}
            onClickRepsSets={() => this.handleClickRepsSets(n.index)}
            onClickDesc={() => this.handleClickDesc(n.index)}
            onClickRemove={() => this.handleClickRemove(n.index)}
          />
        ))}
        <button className="addWorkout" onClick={() => this.addWorkout()}>
          + Add new Exercise +
        </button>
      </div>
    );
  }

  addWorkout() {
    if (window.confirm("Are you sure you want to create a new workout?")) {
      const newObjArr = this.state.workoutObjects.slice();
      const eName = prompt("What is the name for your new exercise?") + "";
      for (var i = 0; i < newObjArr.length; i++) {
        if (newObjArr[i].name === eName) {
          alert(
            "An exercise of this name already exists. You cannot create a new instance of it."
          );
          return;
        }
      }
      const eReps = prompt("How many reps for your new exercise?");
      const eSets = prompt("How many sets for your new exercise?");
      const eDesc = prompt("What is the description for your new exercise?");
      if (!(eName && eReps && eSets && eDesc)) {
        alert(
          "At least one of the values you entered for the exercises is empty, so a new exercise will not be created."
        );
        return;
      }
      const newObj = {
        index: newObjArr.length,
        name: eName,
        reps: eReps,
        sets: eSets,
        desc: eDesc,
      };
      newObjArr.push(newObj);
      this.setState({ workoutObjects: newObjArr });
      const dataHere = newObjArr;
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataHere),
      };
      fetch("/addEntry", requestOptions);
    }
  }

  render() {
    return (
      <div>
        <div>{this.renderWorkouts()}</div>
      </div>
    );
  }
}

function Workout(props) {
  return (
    <button className="workoutBox">
      <div onClick={props.onClickName}>{props.name}</div>
      <div onClick={props.onClickRepsSets}>
        {props.sets} sets X {props.reps} reps
      </div>
      <div onClick={props.onClickDesc}>{props.desc}</div>
      <div className="removeButton" onClick={props.onClickRemove}>
        {" "}
        🗑 Remove 🗑
      </div>
    </button>
  );
}

export default App;
