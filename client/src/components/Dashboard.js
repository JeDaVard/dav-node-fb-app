import React from "react";


export default () => {
    return (
        <main className='mainDash'>
            <div className="dashboard">
                <h4>Dashboard</h4>
                <button className='btn blue-grey z-depth-0'>New Survey</button>
            </div>
            <div className="surveys">
                <h6>Surveys</h6>
                <div className="survey">
                    <p>Name</p>
                </div>
            </div>
        </main>
    )
}