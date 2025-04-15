import React, { useEffect, useState } from 'react'
import './Home2style.css'
import { toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { app } from '../../firebase';
import { db } from '../../firebase';
const auth = getAuth(app);

import { io } from 'socket.io-client';

const socket = io('https://webchat-production-e26f.up.railway.app/'); // Replace with your server URL




const Home2 = () => {
  const navigate = useNavigate();
  const [hostuseremail, setHostuseremail] = useState('');
  const [messageinpute, setMessageinpute] = useState('');
  const [messages, setMessages] = useState([]);

  const [hostuser, setHostuser] = useState({});
  const [receiveruser, setReceiveruser] = useState({});
  const [modeluser, setModeluser] = useState({});





  useEffect(() => {
    socket.emit('joinRoom', "xx");
  
    socket.on('receiveMessage', (message) => {
      setMessages(prev => [...prev, message]); // ✅ Append real-time message
    });
  
    return () => {
      socket.off('receiveMessage');
    };
  }, []);
  

  // ################################################### host user st
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user.email);
        setHostuseremail(user.email)
        try {
          const docRef = doc(db, "Users", user.email);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            // console.log(docSnap.data());
            setHostuser(docSnap.data())
            setModeluser(docSnap.data())
          } else {
            console.log("No such user document!");
          }
        } catch (err) {
          console.error("Error fetching user:", err);
        }


      } else {
        console.log("user not found");
        navigate('login')
      }
    });
  }, [])

  const signout = async () => {
    signOut(auth).then(() => {
      toast.success("Sign Out Successfully")
      navigate('/login')
    }).catch((error) => {
      // An error happened.
    });
  };

  // ################################################### host user st

  // ################################################### message input st

  const sendmessage = async () => {
    const time = new Date().toTimeString().slice(0, 5);
    console.log(hostuseremail);
    console.log(messageinpute);
    console.log(time);

    try {
      const res = await axios.post('https://webchat-production-e26f.up.railway.app/api/create-message', {
        sender: hostuseremail,
        receiver: receiveruser.Email,
        content: messageinpute,
        createdAt: time
      });
      console.log('Response:', res.data);
      console.log('message created successfully!');
      setMessageinpute("")
      // Send through socket too
      socket.emit('sendMessage', res.data.newMessage);
    } catch (err) {
      console.error('Error posting data:', err);
    }


  };

  // ################################################### message input end




  // ################################################### all users st


  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const q = query(collection(db, "Users"), where("Email", "!=", hostuseremail));
        const querySnapshot = await getDocs(q);

        const otherUsers = querySnapshot.docs.map(doc => doc.data());
        console.log("Fetched users:", otherUsers);

        setUsers(otherUsers); // ✅ Set the Firestore result into state
      } catch (error) {
        console.error("Error fetching other users:", error);
      }
    };

    if (hostuseremail) {
      fetchUsers(); // only run if hostuseremail is set
    }
  }, [hostuseremail]); // ✅ Re-run when host user email is available



  // ################################################### all users end







  // ################################################### them changer st
  const [isDark, setIsDark] = useState(false);

  const changetheme = () => {
    setIsDark(!isDark);
  }
  // ################################################### them changer end


  // ################################################### receiver changer st
  const [havereceiver, setHavereceiver] = useState(false);

  const changereceiver = async (Ruser) => {
    setReceiveruser(Ruser);
    setHavereceiver(true);
    try {
      const res = await axios.post('https://webchat-production-e26f.up.railway.app/api/create-chat', {
        members: [hostuseremail, Ruser.Email],
        messages: []
      });
      console.log('Response:', res.data);
      console.log('chat created successfully!');
    } catch (err) {
      console.error('Error posting data:', err);
    }
    try {
      const res = await axios.post('https://webchat-production-e26f.up.railway.app/api/get-messages', {
        members: [hostuseremail, Ruser.Email]
      });
      console.log('Response:', res.data.messages);
      setMessages(res.data.messages)
      console.log('message loaded successfully!');
    } catch (err) {
      console.error('Error load message data:', err);
    }

  }
  // ################################################### receiver changer end

  // ################################################### Left-panel controler st

  const [activeChat, setActiveChat] = useState(null);

  const [leftst, setLeftst] = useState("d-none");


  const lefttgl = () => {
    if (leftst == "d-none") {
      setLeftst("d-block")
    }
    else {
      setLeftst("d-none")
    }

  }

  const hideleft = () => {
    setLeftst("d-none")


  }

  // ################################################### Left-panel controler end


  // const myModal = document.getElementById('myModal')
  // const myInput = document.getElementById('myInput')

  // myModal.addEventListener('shown.bs.modal', () => {
  //   myInput.focus()
  // })

  return (
    <div>
      <div className="d-flex flex-column flex-sm-row vh-100 overflow-hidden ">
        {/* Sidebar */}
        <div className={`${isDark ? 'bg-black' : 'bg-dark'} text-white ps-3 d-flex flex-sm-column justify-content-between w-md-100 align-items-center pt-3`}>
          <div className="d-flex flex-sm-column gap-4">
            <i className="fa-solid fa-house fa-lg my-2 pt-sm-4"></i>
            <span><i className="fa-solid fa-user-plus fa-lg my-2 d-block d-md-none" onClick={() => lefttgl()}></i></span>

          </div>
          <div className="d-flex flex-sm-column gap-4">
            <i className="fa-regular fa-circle-user fa-lg my-2 " data-bs-toggle="modal" data-bs-target="#profileModal"></i>
            <i className="fa-solid fa-moon fa-lg my-2" onClick={() => changetheme()} style={{ color: isDark ? 'yellow' : '' }}></i>
            <i className="fa-solid fa-arrow-right-from-bracket fa-lg my-2 pb-sm-4 pe-4 pe-sm-0" onClick={() => signout()}></i>
          </div>
        </div>

        <div className={`flex-grow-1 p-3 ${isDark ? 'bg-black' : 'bg-dark'}`}>
          <div className={`d-flex flex-row h-100 overflow-hidden rounded-4 ${isDark ? 'bg-dark' : 'bg-light'} `}>
            {/* Left Panel - Chat List */}
            <div className={`flex-grow-0 flex-shrink-0 left-panel ${leftst} d-md-block`}>
              <div className={`p-3 ${isDark ? 'bg-dark' : 'bg-light'} flex-grow-0 flex-shrink-0 ${leftst} d-md-block left-panel h-100`} style={{ maxWidth: "300px", overflowY: "auto" }}>
                <span className="input-group-text bg-white border rounded-5 mb-3 search-bar">
                  <i className="bi bi-search"></i>
                  <input type="text" placeholder="Search" className="form-control py-0 border-0" style={{ boxShadow: "none" }} />
                </span>
                <div className='left-pn-itm'>

                  {users.map((user, index) => (
                    <div key={index} className={`d-flex align-items-center p-2 rounded-4 mb-1 p-1`} // step 3
                      onClick={() => {
                        setActiveChat(user.Email);
                        hideleft()
                        changereceiver(user);
                      }} // step 2
                      style={{ cursor: 'pointer', backgroundColor: `${activeChat === user.Email ? '#65ebff' : 'white'}` }}>
                      <img
                        src={user.profileImg}
                        alt=""
                        className="rounded me-2"
                        width={50}
                        height={50}
                      />
                      <div className="flex-grow-1 py-1">
                        <div className="fw-bold">{user.name}</div>
                        <div className="text-muted small">{user.username}</div>
                      </div>
                      {/* <div className="badge bg-danger text-white rounded-pill">1</div> */}
                    </div>
                  ))}
                </div>
              </div>
            </div>


            {/* Chat Window */}
            <div className='flex-grow-1 '>
              <div className={`d-flex flex-column flex-grow-1 h-100 ${isDark ? 'bg-dark' : 'bg-light'}`} style={{ height: '100%' }}>
                {!havereceiver && (
                  <div className="d-flex flex-column justify-content-center align-items-center text-center flex-grow-1">
                    <i className={`bi bi-chat-dots mb-3`} style={{ fontSize: '3rem', color: isDark ? 'white' : 'black' }}></i>
                    <h5 className={`${isDark ? 'text-white' : 'text-dark'}`}>No Conversation Selected</h5>
                    <p className={`${isDark ? 'text-secondary' : 'text-muted'}`} style={{ maxWidth: '300px' }}>
                      Select a user from the panel to start chatting.
                    </p>
                  </div>
                )}
                {havereceiver && (
                  <div className={`d-flex flex-column flex-grow-1 h-100 ${isDark ? 'bg-dark' : 'bg-light'}`}>
                    {/* Header */}
                    <div className={` border-bottom ${isDark ? 'bg-dark text-white border-white' : 'bg-light'} px-3 py-2 d-flex  align-items-center`} data-bs-toggle="modal" data-bs-target="#receiverModal">
                      <img src={receiveruser.profileImg} alt="Jasmin Lowery" className="rounded-3" style={{ width: "40px", height: "40px", objectFit: "cover" }} />
                      <div className='ms-2' style={{ minWidth: "120px" }}>
                        <h4 className="mb-0 mt-3" style={{ fontWeight: '500', lineHeight: '10px' }}>{receiveruser.name}</h4>
                        <small className={`${isDark ? 'text-secondary' : 'text-muted'}`} style={{ fontSize: "12px" }}> {receiveruser.username}</small>
                      </div>
                      <div className="d-flex ms-auto gap-3">
                        <i className="bi bi-search" />
                        <i className="bi bi-bell" />
                        <i className="bi bi-three-dots-vertical" />
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className={` flex-grow-1 overflow-auto px-4 py-3 ${isDark ? 'bg-dark' : 'bg-light'}`} style={{
                      maxHeight: 'calc(100vh - 185px)', // adjust according to your header and input height
                      overflowY: 'auto'
                    }}>
                      {messages.map((msg, index) => {
                        if (msg.sender == hostuseremail) {
                          return (
                            <div key={index} className="d-flex align-items-end mb-3 flex-row-reverse">

                              <img src={hostuser.profileImg} alt="Jasmin Lowery" className="rounded-3" style={{ width: "40px", height: "40px", objectFit: "cover" }} />

                              <img src="./right_corn_dark.png" alt="" className='' style={{ height: '25px', width: "20px" }} />

                              <div className="p-3 pb-1 bubble left" style={{ backgroundColor: "#002BFF", borderRadius: "16px", maxWidth: "400px", borderBottomRightRadius: 0, position: "relative", boxShadow: " -15px .5rem 1rem rgba(0,0,0, .20)" }}>

                                <div className="text-white" style={{ fontSize: "14px", lineHeight: "1.4", fontWeight: 'lighter' }}>
                                  {msg.content}
                                </div>

                                {/* Footer */}
                                <div className="d-flex justify-content-between mt-1 text-muted text-white flex-row-reverse" style={{ fontSize: "12px" }}>
                                  <div className='text-white '>
                                    {/* <span role="img" aria-label="emoji">👏</span> */}
                                    {msg.createdAt}
                                  </div>
                                  {/* <div className='text-white ps-1 '>
                                  <i className="bi bi-eye me-1 "></i>23
                                </div> */}
                                  <div className=' bg-white rounded-circle shadow pt-1' style={{ textAlign: "center", height: "25px", width: "25px", lineHeight: "15px", fontSize: "15px", color: "#000", bottom: '-5px', left: "-5px", position: "absolute" }}>
                                    👏</div>
                                </div>
                              </div>
                            </div>
                          )
                        } else {
                          return (
                            <div key={index} className="d-flex align-items-end mb-3">

                              <img src={receiveruser.profileImg} alt="Jasmin Lowery" className="rounded-3" style={{ width: "40px", height: "40px", objectFit: "cover" }} />

                              <img src={`./left_corn${isDark ? '_dark' : ''}.png`} alt="" className='' style={{ height: '25px', width: "25px" }} />

                              <div className={`p-3 pb-1 bubble left ${isDark ? 'text-white' : ''}`} style={{ backgroundColor: isDark ? 'black' : '#f0edfb', borderRadius: "16px", maxWidth: "400px", borderBottomLeftRadius: 0, position: "relative", boxShadow: " 15px .5rem 1rem rgba(0,0,0, .20)" }} >

                                <div className={`${isDark ? 'text-white' : 'text-dark'}`} style={{ fontSize: "14px", lineHeight: "1.4" }}>
                                  {msg.content}
                                </div>

                                {/* Footer */}
                                <div className={`d-flex justify-content-between mt-1 ${isDark ? 'text-secondary' : 'text-muted'}`} style={{ fontSize: "12px" }}>
                                  <div>
                                    {/* <span role="img" aria-label="emoji">👏</span> */}
                                    {msg.createdAt}
                                  </div>
                                  {/* <div className='d-flex'>
                                  <i className="bi bi-eye me-1"></i>23 &nbsp;
                                </div> */}
                                  <div className=' bg-white rounded-circle shadow pt-1' style={{ textAlign: "center", height: "25px", width: "25px", lineHeight: "15px", fontSize: "15px", color: "#000", bottom: '-5px', right: "-5px", position: "absolute" }}>
                                    👏</div>
                                </div>
                              </div>
                            </div>
                          )
                        }
                      })}
                    </div>

                    {/* Message Input */}
                    <div
                      className={`p-3 border-top d-flex align-items-center ${isDark ? 'bg-dark' : 'bg-light'}`}
                      style={{
                        position: 'sticky',
                        bottom: 0,
                        zIndex: 10,
                        backgroundColor: isDark ? '#121212' : '#f9f9f9'
                      }}
                      >
                      <div className="d-flex align-items-center border form-control rounded-4 px-2" style={{ backgroundColor: '#EEEFFA' }}>
                        <i className="fa-solid fa-paperclip me-2"></i>
                        <input
                          type="text"
                          placeholder="Message"
                          className="form-control py-0 border-0 flex-grow-1"
                          style={{ boxShadow: "none", backgroundColor: '#EEEFFA' }}
                          value={messageinpute}
                          onChange={e => setMessageinpute(e.target.value)}
                        />
                        <i className="bi bi-mic fs-5 text-muted me-3"></i>
                        <i className="bi bi-send fs-5 text-primary me-2" onClick={() => sendmessage()}></i>
                      </div>
                    </div>
                  </div>
                )}



              </div>
            </div>

          </div>
        </div>


      </div>



      <div className="modal fade" id="profileModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered  container-sm">
          <div className="modal-content rounded-5">
            <div className="modal-header border-0">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body ">
              <div className='position-relative d-flex align-items-center justify-content-center'>
                <img src={modeluser.profileImg} alt="Jasmin Lowery" className="rounded-3 " style={{ width: "200px", height: "200px", objectFit: "cover", position: "absolute", top: "-100px" }} />
                <div className='mt-4' style={{ height: "200px" }}></div>
                <div className='mt-3'>
                  <div className='mt-3 fs-5 text-center' style={{ fontWeight: 'bold' }}>{modeluser.name}</div>
                  <div className='fs-6 text-center'>{modeluser.username}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="receiverModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered  container-sm">
          <div className="modal-content rounded-5">
            <div className="modal-header border-0">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body ">
              <div className='position-relative d-flex align-items-center justify-content-center'>
                <img src={receiveruser.profileImg} alt="Jasmin Lowery" className="rounded-3 " style={{ width: "200px", height: "200px", objectFit: "cover", position: "absolute", top: "-100px" }} />
                <div className='mt-4' style={{ height: "200px" }}></div>
                <div className='mt-3'>
                  <div className='mt-3 fs-5 text-center' style={{ fontWeight: 'bold' }}>{receiveruser.name}</div>
                  <div className='fs-6 text-center'>{receiveruser.username}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>




    </div >
  )
}

export default Home2
