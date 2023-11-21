import React, { useState } from 'react';
import './App.css'
 
const AnimalForm = ({ addAnimal }) => {
  const [animal, setAnimal] = useState('');
  const [breed, setBreed] = useState('');
  const [street, setStreet] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [contact, setContact] = useState('');
 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!animal || !breed || !street || !contact) return;
    addAnimal({ animal, breed, street, imageURL, contact, status: 'Aguardando' });
    setAnimal('');
    setBreed('');
    setStreet('');
    setImageURL('');
    setContact('');
  };
 
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Animal"
        value={animal}
        onChange={(e) => setAnimal(e.target.value)}
      />
      <input
        type="text"
        placeholder="Raça"
        value={breed}
        onChange={(e) => setBreed(e.target.value)}
      />
      <input
        type="text"
        placeholder="Rua"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
      />
      <input
        type="text"
        placeholder="URL da Imagem"
        value={imageURL}
        onChange={(e) => setImageURL(e.target.value)}
      />
      <input
        type="text"
        placeholder="Contato"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
      />
      <button type="submit">Cadastrar</button>
    </form>
  );
};
 
const AnimalList = ({ animals, onFound, onUpdateStatus, onRemove }) => {
  return (
    <ul>
      {animals.map((animal, index) => (
        <li key={index}>
          <img src={animal.imageURL} alt={animal.animal} />
          <div>
            <p>{animal.animal} - {animal.breed} - {animal.street}</p>
            <p><strong>Status:</strong> {animal.status}</p>
            {animal.status === 'Aguardando' && (
              <button onClick={() => onFound(index)}>Encontrado</button>
            )}
            <button onClick={() => onUpdateStatus(index)}>
              {animal.status === 'Aguardando' ? 'Marcar como Encontrado' : 'Marcar como Aguardando'}
            </button>
            <button onClick={() => onRemove(index)}>Remover</button>
          </div>
        </li>
      ))}
    </ul>
  );
};
 
const App = () => {
  const [animals, setAnimals] = useState([]);
 
  const addAnimal = (newAnimal) => {
    setAnimals([...animals, newAnimal]);
  };
 
  const handleFound = (index) => {
    const updatedAnimals = [...animals];
    updatedAnimals[index].status = 'Encontrado';
    setAnimals(updatedAnimals);
  };
 
  const updateStatus = (index) => {
    const updatedAnimals = [...animals];
    updatedAnimals[index].status =
      updatedAnimals[index].status === 'Aguardando' ? 'Encontrado' : 'Aguardando';
    setAnimals(updatedAnimals);
  };
 
  const removeAnimal = (index) => {
    const updatedAnimals = [...animals];
    updatedAnimals.splice(index, 1);
    setAnimals(updatedAnimals);
  };
 
  return (
    <div>
      <h1>Cadastro de Animais Perdidos</h1>
      <AnimalForm addAnimal={addAnimal} />
      <AnimalList
        animals={animals}
        onFound={handleFound}
        onUpdateStatus={updateStatus}
        onRemove={removeAnimal}
      />
    </div>
  );
};
 
export default App;