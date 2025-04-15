import React from 'react'

const Home = () => {
  return (
    <div>
      <div className="d-flex flex-column flex-md-row vh-100 overflow-hidden">
        {/* Sidebar */}
        <div className="bg-dark text-white p-3 d-flex flex-md-column align-items-center" style={{ width: "80px" }}>
          <div className="mb-md-4 mb-0 fs-4">△</div>
          <div className="d-flex flex-md-column gap-4">
            <i className="bi bi-chat-left-text-fill position-relative">
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                43
              </span>
            </i>
            <i className="bi bi-briefcase-fill position-relative">
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                4
              </span>
            </i>
            <i className="bi bi-people-fill" />
            <i className="bi bi-newspaper" />
            <i className="bi bi-archive-fill" />
            <i className="bi bi-person-circle" />
            <i className="bi bi-pencil-square" />
            <i className="bi bi-box-arrow-left" />
          </div>
        </div>

        {/* Left Panel - Chat List */}
        <div className="border-end p-3 bg-light flex-grow-0 flex-shrink-0" style={{ width: "300px", overflowY: "auto" }}>
          <input type="text" placeholder="Search" className="form-control mb-3" />
          <div>
            {["Design chat", "Osman Campos", "Jayden Church", "Jacob Mcleod", "Jasmin Lowery"].map((name, index) => (
              <div key={index} className="d-flex align-items-center mb-3">
                <img
                  src={`https://i.pravatar.cc/40?img=${index + 10}`}
                  alt=""
                  className="rounded-circle me-2"
                  width={40}
                  height={40}
                />
                <div className="flex-grow-1">
                  <div className="fw-bold">{name}</div>
                  <div className="text-muted small">Last message...</div>
                </div>
                <div className="badge bg-danger text-white rounded-pill">1</div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-grow-1 d-flex flex-column">
          {/* Header */}
          <div className="border-bottom px-4 py-2 d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-0">Design chat</h5>
              <small>23 members, 10 online</small>
            </div>
            <div className="d-flex gap-3">
              <i className="bi bi-search" />
              <i className="bi bi-bell" />
              <i className="bi bi-three-dots-vertical" />
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-grow-1 overflow-auto px-4 py-3" style={{ background: "#f9f9fb" }}>
            {/* Example Messages */}
            <div className="mb-3">
              <div className="d-flex align-items-center mb-1">
                <img src="https://i.pravatar.cc/40?img=31" alt="" className="rounded-circle me-2" width={40} />
                <strong>Jasmin Lowery</strong>
              </div>
              <div className="bg-white p-3 rounded shadow-sm" style={{ maxWidth: "70%" }}>
                I added new flows to our design system. Now you can use them for your projects!
                <div className="d-flex justify-content-between mt-2 text-muted small">
                  <div>👍 4</div>
                  <div>09:20</div>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="d-flex align-items-center mb-1">
                <img src="https://i.pravatar.cc/40?img=33" alt="" className="rounded-circle me-2" width={40} />
                <strong>Alex Hunt</strong>
              </div>
              <div className="bg-white p-3 rounded shadow-sm" style={{ maxWidth: "70%" }}>
                Our intern @jchurch has successfully completed his probationary period!
                <div className="d-flex justify-content-between mt-2 text-muted small">
                  <div>👏 5 · 💬 4</div>
                  <div>09:24</div>
                </div>
              </div>
            </div>

            {/* Sent message */}
            <div className="d-flex justify-content-end mb-3">
              <div className="bg-primary text-white p-3 rounded shadow-sm" style={{ maxWidth: "70%" }}>
                Jaden, my congratulations! I will be glad to work with you on a new project 😉
                <div className="d-flex justify-content-between mt-2 text-white-50 small">
                  <div>👀 10</div>
                  <div>09:27</div>
                </div>
              </div>
            </div>

            {/* Image Message */}
            <div className="mb-3">
              <div className="d-flex align-items-center mb-1">
                <img src="https://i.pravatar.cc/40?img=34" alt="" className="rounded-circle me-2" width={40} />
                <strong>Jessie Rollins</strong>
              </div>
              <img src="https://images.unsplash.com/photo-1559028012-481c04fa702c" className="img-fluid rounded" alt="Meeting" />
              <div className="text-muted small mt-1">👀 10 · 09:30</div>
            </div>

            {/* Voice Message */}
            <div className="mb-3">
              <div className="d-flex align-items-center mb-1">
                <img src="https://i.pravatar.cc/40?img=29" alt="" className="rounded-circle me-2" width={40} />
                <strong>Jessie Rollins</strong>
              </div>
              <div className="d-flex align-items-center bg-light rounded p-2 shadow-sm" style={{ maxWidth: "70%" }}>
                <i className="bi bi-play-circle-fill fs-4 me-3 text-primary"></i>
                <div className="flex-grow-1">
                  <div className="progress mb-1" style={{ height: "4px" }}>
                    <div className="progress-bar" role="progressbar" style={{ width: "30%" }}></div>
                  </div>
                  <small className="text-muted">0:15 · 👀 10 · 09:30</small>
                </div>
              </div>
            </div>
          </div>

          {/* Message Input */}
          <div className="p-3 border-top d-flex align-items-center bg-white">
            <input type="text" className="form-control me-2" placeholder="Your message" />
            <i className="bi bi-mic fs-4 text-muted me-3"></i>
            <i className="bi bi-send fs-4 text-primary"></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
