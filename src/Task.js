import React from "react";

export default function Task({
    task,
    edit,
    changeEdit,
    id,
    changeItem,
    getValue,
    deleteItem,
    check,
    changeCheck,
}) {
    return (
        <li>
            {!edit ? (
                <span onClick={() => changeEdit(id)}>{task}</span>
            ) : (
                <input
                    value={getValue(id)}
                    onChange={(e) => changeItem(id, e)}
                    onBlur={() => changeEdit(id)}
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            changeEdit(id);
                        }
                    }}
                />
            )}{" "}
            <button onClick={() => deleteItem(id)}>Delete</button>
            <input
                type="checkbox"
                checked={check}
                onChange={() => changeCheck(id)}
            />
        </li>
    );
}
