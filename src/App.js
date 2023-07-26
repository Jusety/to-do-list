import React, { useState } from "react";
import Task from "./Task";
import "./App.css";

const getInitObj = () => {
    return {
        task: "",
        edit: false,
        check: false,
    };
};

function App() {
    const [obj, setObj] = useState(getInitObj());
    const [notes, setNotes] = useState([]);

    const changeItem = (id, e) =>
        setNotes(
            notes.map((note, index) => {
                if (id === index) {
                    return { ...note, task: e.target.value };
                } else {
                    return note;
                }
            })
        );

    const changeEdit = (id) =>
        setNotes(
            notes.map((note, index) => {
                if (id === index) {
                    return { ...note, edit: !note.edit };
                } else {
                    return note;
                }
            })
        );

    const getValue = (id) =>
        notes.reduce(
            (res, note, index) => (index === id ? note.task : res),
            ""
        );

    const deleteItem = (id) =>
        setNotes(notes.filter((note, index) => id !== index && note));

    const changeCheck = (id) =>
        setNotes(
            notes.map((note, index) => {
                if (id === index) {
                    return { ...note, check: !note.check };
                } else {
                    return note;
                }
            })
        );

    const compTasks = notes.map(
        (note, index) =>
            note.check && (
                <Task
                    key={index}
                    task={note.task}
                    edit={note.edit}
                    id={index}
                    changeEdit={changeEdit}
                    changeItem={changeItem}
                    getValue={getValue}
                    deleteItem={deleteItem}
                    check={note.check}
                    changeCheck={changeCheck}
                />
            )
    );

    const inCompTasks = notes.map(
        (note, index) =>
            !note.check && (
                <Task
                    key={index}
                    task={note.task}
                    edit={note.edit}
                    id={index}
                    changeEdit={changeEdit}
                    changeItem={changeItem}
                    getValue={getValue}
                    deleteItem={deleteItem}
                    check={note.check}
                    changeCheck={changeCheck}
                />
            )
    );

    let taskDone = 0;
    let taskUnDone = 0;

    notes.map((note) => (note.check ? taskDone++ : taskUnDone++));

    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "Novermber",
        "December",
    ];

    const date = new Date();

    return (
        <div>
            <h1>
                {months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}
            </h1>
            <p className="date">
                Complete tasks: {taskDone}, Task incomplete: {taskUnDone}
            </p>
            <div style={{ marginLeft: "80px" }}>
                <input
                    style={{ width: "140px" }}
                    onChange={(e) => {
                        setObj({ ...obj, task: e.target.value });
                    }}
                />{" "}
                <button
                    onClick={(e) => {
                        setNotes([...notes, obj]);
                        setObj(getInitObj());
                        e.target.previousElementSibling.value = "";
                    }}
                >
                    Add Task
                </button>
                <h3>Incomplete</h3>
                <ul>{inCompTasks}</ul>
                <h3>Completed</h3>
                <ul>{compTasks}</ul>
            </div>
        </div>
    );
}

export default App;
