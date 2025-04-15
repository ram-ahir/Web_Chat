import React, { useState } from 'react'

const Left_panel = () => {

     const [activeChat, setActiveChat] = useState(null); // step 1
      const check = () => {
        console.log(window.innerWidth)
      }
    return (
        <div className="p-3 bg-light flex-grow-0 flex-shrink-0 d-none d-md-block" style={{ maxWidth: "300px", overflowY: "auto" }}>

            <span className="input-group-text bg-white border rounded-5 mb-3">
                <i className="bi bi-search"></i>
                <input type="text" placeholder="Search" className="form-control py-0 border-0" style={{ boxShadow: "none" }} />
            </span>
            <div>
                {["Design chat", "Osman Campos", "Jayden Church", "Jacob Mcleod", "Jasmin Lowery"].map((name, index) => (
                    <div key={index} className={`d-flex align-items-center p-2 rounded-3 mb-1 p-1`} // step 3
                        onClick={() => {
                            setActiveChat(name);
                            check()
                        }} // step 2
                        style={{ cursor: 'pointer', backgroundColor: `${activeChat === name ? '#A2EFFA' : 'white'}` }}>
                        <img
                            src={`https://i.pravatar.cc/40?img=${index + 10}`}
                            alt=""
                            className="rounded me-2"
                            width={50}
                            height={50}
                        />
                        <div className="flex-grow-1 py-1">
                            <div className="fw-bold">{name}</div>
                            <div className="text-muted small">Last message...</div>
                        </div>
                        {/* <div className="badge bg-danger text-white rounded-pill">1</div> */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Left_panel
