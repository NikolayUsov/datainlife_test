/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react';
import cn from 'classnames';
import styles from './cart.module.scss';

const getOrderInfo = (orderObj) => {
  const orderInfo = {
    counter: 0,
    sum: 0,
  };
  const arr = Object.values(orderObj);
  arr.forEach((elem) => {
    orderInfo.counter += elem.amount;
    orderInfo.sum += elem.totallSum;
  });

  return orderInfo;
};

export default function Cart({ orderedOffers, handleSendOrder }) {
  const orderInfo = getOrderInfo(orderedOffers);
  return (
    <div className={cn('wrapper', styles.cart)}>
      <p className={styles.information}>{`В корзине ${orderInfo.counter} товар на общую сумму ${orderInfo.sum}`}</p>
      <a href="#" onClick={handleSendOrder} className={styles.buttonOrder}>Оформить заказ</a>
    </div>
  );
}
