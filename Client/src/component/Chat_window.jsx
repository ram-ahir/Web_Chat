import React from 'react'

const Chat_window = () => {
    return (
        <div className="d-flex flex-column flex-grow-1 h-100 bg-light" >
            {/* Header */}
            <div className="border-bottom bg-light px-3 py-2 d-flex  align-items-center">
                <img src="https://i.pravatar.cc/48?img=12" alt="Jasmin Lowery" className="rounded-3" style={{ width: "40px", height: "40px", objectFit: "cover" }} />
                <div className='ms-2'>
                    <h4 className="mb-0 mt-3" style={{ fontWeight: '500', lineHeight: '10px' }}>Design chat</h4>
                    <small className='text-muted ' style={{ fontSize: "12px" }}> 10 online</small>
                </div>
                <div className="d-flex ms-auto gap-3">
                    <i className="bi bi-search" />
                    <i className="bi bi-bell" />
                    <i className="bi bi-three-dots-vertical" />
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-grow-1 overflow-auto px-4 py-3" style={{ background: "#f9f9fb" }}>
                <div className="d-flex align-items-end mb-3">

                    <img src="https://i.pravatar.cc/48?img=12" alt="Jasmin Lowery" className="rounded-3" style={{ width: "40px", height: "40px", objectFit: "cover" }} />

                    <img src="./left_corn.png" alt="" className='' style={{ height: '25px', width: "25px" }} />

                    <div className="p-3 pb-1 bubble left  " style={{ backgroundColor: "#f0edfb", borderRadius: "16px", maxWidth: "400px", borderBottomLeftRadius: 0, position: "relative", boxShadow: " 15px .5rem 1rem rgba(0,0,0, .20)" }} >

                        <div className="text-dark" style={{ fontSize: "14px", lineHeight: "1.4" }}>
                            I added new flows to our design system.
                            Now you can use them for your projects!
                        </div>

                        {/* Footer */}
                        <div className="d-flex justify-content-between mt-1 text-muted" style={{ fontSize: "12px" }}>
                            <div>
                                {/* <span role="img" aria-label="emoji">👏</span> */}
                                09:20
                            </div>
                            <div className='d-flex'>
                                <i className="bi bi-eye me-1"></i>23 &nbsp;

                            </div>
                            <div className=' bg-white rounded-circle shadow pt-1' style={{ textAlign: "center", height: "25px", width: "25px", lineHeight: "15px", fontSize: "15px", color: "#000", bottom: '-5px', right: "-5px", position: "absolute" }}>
                                👏</div>
                        </div>
                    </div>
                </div>

                <div className="d-flex align-items-end mb-3 flex-row-reverse">

                    <img src="https://i.pravatar.cc/48?img=12" alt="Jasmin Lowery" className="rounded-3" style={{ width: "40px", height: "40px", objectFit: "cover" }} />

                    <img src="./right_corn_dark.png" alt="" className='' style={{ height: '25px', width: "20px" }} />

                    <div className="p-3 pb-1 bubble left" style={{ backgroundColor: "#002BFF", borderRadius: "16px", maxWidth: "400px", borderBottomRightRadius: 0, position: "relative", boxShadow: " -15px .5rem 1rem rgba(0,0,0, .20)" }}>

                        <div className="text-white" style={{ fontSize: "14px", lineHeight: "1.4", fontWeight: 'lighter' }}>
                            I added new flows to our design system.
                            Now you can use them for your projects!
                        </div>

                        {/* Footer */}
                        <div className="d-flex justify-content-between mt-1 text-muted text-white flex-row-reverse" style={{ fontSize: "12px" }}>
                            <div className='text-white '>
                                {/* <span role="img" aria-label="emoji">👏</span> */}
                                09:20
                            </div>
                            <div className='text-white ps-1 '>
                                <i className="bi bi-eye me-1 "></i>23
                            </div>
                            <div className=' bg-white rounded-circle shadow pt-1' style={{ textAlign: "center", height: "25px", width: "25px", lineHeight: "15px", fontSize: "15px", color: "#000", bottom: '-5px', left: "-5px", position: "absolute" }}>
                                👏</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Message Input */}
            <div className="p-3 border-top d-flex align-items-center bg-light">
                {/* <input type="text" className="form-control me-2" placeholder="Your message" /> */}
                <span className="input-group-text  border form-control rounded-4" style={{ backgroundColor: '#EEEFFA' }}>
                    <i className="fa-solid fa-paperclip"></i>
                    <input type="text" placeholder="Search" className="form-control py-0 border-0" style={{ boxShadow: "none", backgroundColor: '#EEEFFA' }} />
                    <i className="bi bi-mic fs-5 text-muted me-3"></i>
                    <i className="bi bi-send fs-5 text-primary  me-3"></i>
                </span>

            </div>
        </div>
    )
}

export default Chat_window
