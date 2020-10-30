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
      showAlert(true, 'danger', 'please enter accepted value');
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'value is changed');
    } else {
      showAlert(true, 'success', 'item added to the list');
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName('');
    }
  };

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, 'danger', 'emptied the List');
    setList('');
  };

  const handleRemove = (id) => {
    showAlert(true, 'danger', 'item removed');
    setList(list.filter((item) => item.id !== id));
  };

  const handleEdit = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  return (
    <>
      <section className='section-center'>
        {alert.show ? (
          <Alert {...alert} removeAlert={showAlert} list={list} />
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
            <List
              items={list}
              removeItem={handleRemove}
              editItem={handleEdit}
            />
            <button className='clear-btn' onClick={clearList}>
              clear-items
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default App;
