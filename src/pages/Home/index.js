import React, { useState, useEffect } from 'react';
import { BsTrash } from 'react-icons/bs';
import { TiPinOutline } from 'react-icons/ti';

import Form from '../../components/FormComponent';
import api from '../../api/api';

import '../../style/home.css';

function Home() {
  const [flag, setFlag] = useState(false);
  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    async function exec() {
      const data = await api.get('/recados');
      const json = await data.data;
      setData(json.recados);
    }
    exec();
  }, []);
  useEffect(() => {
    data.map(async (item) => {
      await api.delete(`/recados/${item.id}`);
    });
  }, [data]);

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
            <div key={item.id} className="cards">
              <div className="cards-group">
                <TiPinOutline size={22} />
                <button className="deletar">
                  <BsTrash size={18} />
                </button>
              </div>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      {flag ? <Form onClick={() => setFlag(false)} /> : null}
    </div>
  );
}

export default Home;
