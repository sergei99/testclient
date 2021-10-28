import { React, useState, useEffect } from 'react';
import api from '../api/index';
import TableItem from './TableItem/index';
import './style.css';

const Table = () => {
  const [dogs, setDogs] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [breed, setBreed] = useState('');
  const [title, setTitle] = useState('');

  const getDogs = async () => {
    try {
      const request = await api.get(`/dogs?breed=${breed}&title=${title}`);
      const dogsCollection = request.data.dogsBreedCollectin;
      setDogs(dogsCollection);
    } catch (e) {
      console.log(e);
    }
  };

  const getBreeds = async () => {
    try {
      const request = await api.get('/breeds');
      const allBreeds = request.data.breedsCollectin;
      setBreeds(allBreeds);
    } catch (e) {
      console.log(e);
    }
  };

  const renderDogsTable = () => {
    return dogs.map((item, index) => {
      const srcImage = `https://images.dog.ceo/breeds/${item.breed[0].breed}/${item.title}.jpg`;
      return (
        <TableItem key={index} title={item.title} srcImage={srcImage} breed={item.breed[0].breed} />
      );
    });
  };

  const renderBreeds = () => {
    return breeds.map((item, index) => {
      const i = index;
      return (
        <option value={item} key={i}>
          {item}
        </option>
      );
    });
  };

  const onChange = (e) => {
    if (e.target.value === 'All dogs') {
      setBreed('');
    } else {
      setBreed(e.target.value);
    }
  };

  const handleOnChange = (e) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    getBreeds();
  }, []);

  useEffect(() => {
    getDogs();
  }, [breed]);

  useEffect(() => {
    getDogs();
  }, [title]);

  return (
    <div>
      <input type="text" onChange={handleOnChange} />
      <select value={breed} onChange={onChange}>
        <option value="All dogs">All dogs</option>
        {renderBreeds()}
      </select>
      <table>{renderDogsTable()}</table>
    </div>
  );
};

export default Table;
