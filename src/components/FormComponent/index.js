import React, { useState } from 'react';
import '../../style/form.css';
import api from '../../api/api';

export default function Form({ onClick }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateData = async (e) => {
    await api.post('/recados', { title, description });
  };

  return (
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
        <button className="button" type="submit">
          Criar
        </button>
      </form>
    </div>
  );
}
