import React, { useState, useEffect } from 'react';
import { BsTrash } from 'react-icons/bs';
import { TiPinOutline } from 'react-icons/ti';

import api from '../../api/api';

import '../../style/home.css';
import '../../style/form.css';

function Home() {
  const [flag, setFlag] = useState(false);
  const [update, setUpdate] = useState(false);

  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    async function exec() {
      const data = await api.get('/recados');
      const json = await data.data;
      setData(json);
    }
    exec();
  }, [flag, update]);

  useEffect(() => {
    setData(data);
  }, [data, title, description, flag]);

  async function del(id) {
    await api.delete(`/recados/${id}`);
    setUpdate(!update);
  }

  const handleCreateData = async (e) => {
    e.preventDefault();
  };
  const enviar = async () => {
    await api.post('/recados', { title, description });
    setFlag(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Mural de recados</h1>
        <button className="adicionar" onClick={() => setFlag(!flag)}>
          Adicionar Recados
        </button>
      </div>
      <div className="section">
        <div className="cardContainer">
          {data.map((item) => (
            <div key={item._id} className="cards">
              <div className="cards-group">
                <TiPinOutline size={22} />
                <button onClick={() => del(item._id)} className="deletar">
                  <BsTrash size={18} />
                </button>
              </div>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      {flag ? (
        <div className="formContainer">
          <h2 className="formTitle">Novo recado</h2>
          <form onSubmit={handleCreateData}>
            <div className="input-group">
              <label htmlFor="">Titúlo</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
                className="titulo"
                type="text"
              />
            </div>
            <label htmlFor="">Conteúdo</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={() => enviar()} className="button" type="submit">
              Criar
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}

export default Home;
