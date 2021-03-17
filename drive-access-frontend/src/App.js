import Navbar from './components/Navbar.js';
//import LeftPanel from './components/LeftPanel.js';
import MailList from './components/MailList.js';
import AddMember from './components/AddMember.js';
import {useState, useEffect} from 'react';

function App() {

  const[mail_list, setMail] = useState([])

  useEffect( () => {
    const getUsers = async () => {
      const usersFromServer = await fetchUsers()
      setMail(usersFromServer)
    }

    getUsers()
  }, [])

  const fetchUsers = async () => {
    const res = await fetch("http://127.0.0.1:8080/folder/all_users")
    const data = await res.json()
    console.log(data['data'])
    return data['data']
  }
  

  const addMail = async (mail) => {
    //const id = Math.floor(Math.random() * 10000) + 1
    console.log(mail)
    const res = await fetch("http://127.0.0.1:8080/folder/add_user", {
      method : "POST",
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email_id" : mail['email'],
        "file_id" : "1uRssvW3FHpSHh7YYtAy_qrHQNlPDDU7d"
      })
    })

    const id = res['data']
    const new_member = {id, ...mail}
    setMail([...mail_list, new_member])
  }

  const deleteMail = async (id) => {  
    await fetch("http://127.0.0.1:8080/folder/remove_user", {
      method : "POST",
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "id" : id,
        "file_id" : "1uRssvW3FHpSHh7YYtAy_qrHQNlPDDU7d"
      })
    })


    setMail(
      mail_list.filter(
        (item) => item.id !== id
      )
    )
  }

  return (
    <div className='App'>
      <Navbar />
      <h3>Manager : TONMOY</h3>
      <table className='table'>
        <thead></thead>
        <tbody>
          <tr>
            <td>
              <div className='leftpanel'>
                <AddMember onAdd={addMail}/>
              </div>
            </td>
            <td>
              <div className="container">
                <h2>Teammates</h2>
                {mail_list.length ? <MailList mail_list={mail_list} onDelete={deleteMail} /> : <p>No Members</p>}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      
    </div>
  );
}

export default App;
