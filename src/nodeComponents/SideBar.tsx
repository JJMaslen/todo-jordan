import React from "react";

function route() {
    return(
        <div className="route">
            <p></p>
        </div>
    )
}

interface SideBarProps {
    onCreateNode: () => void;
}

function SideBar({onCreateNode }: SideBarProps){
    return(
        <div className="sideBar">
            <button onClick={onCreateNode}> Create Node</button>
        </div>
    )
}

export default SideBar;