import { Image } from 'antd';
import React from 'react';
import '../styles/prescription.css'





export const Prescription = ({data}) => {
  return data.drinks ? (

    <div className="prescrip">
      <Image
        width={200}
        src={data.drinks[0].strDrinkThumb}
        className="pic-container"

      />

      <div className="drink-name">
        Bebida: {data.drinks[0].strDrink}
      </div>
      <hr />
      <div className="drink-category">
        Categoria: {data.drinks[0].strCategory}
      </div>
      <hr />
    </div>
  ) : null
}
 