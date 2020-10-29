import React, { useState } from 'react';
import List from './List';
import Alert from './Alert';

const App = () => {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // alert
      showAlert(true, 'danger', 'please enter accepted value');
    } else if (name && isEditing) {
      // edit
    } else {
      // alert
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName('');
    }
  };

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };

  return (
    <>
      <section className='section-center'>
        {alert.show ? (
          <Alert {...alert} removeAlert={showAlert} />
        ) : (
          <p className='alert'></p>
        )}
        <form className='grocery-form' onSubmit={handleSubmit}>
          <h3>Persistant List</h3>
          <div className='form-control'>
            <input
              type='text'
              className='grocery'
              placeholder='e.g. eggs'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type='submit' className='submit-btn'>
              {isEditing ? 'edit' : 'submit'}
            </button>
          </div>
          <button>submit</button>
        </form>
        {list.length > 0 && (
          <div className='grocery-container'>
            <List items={list} />
            <button className='clear-btn'>clear-items</button>
          </div>
        )}
      </section>
    </>
  );
};

export default App;
