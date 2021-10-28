import React from 'react';
import './style.css';

const TableItem = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.title}</td>
        <td>
          <img src={props.srcImage} alt="breed" />
        </td>
        <td>{props.breed}</td>
      </tr>
    </tbody>
  );
};

export default TableItem;
