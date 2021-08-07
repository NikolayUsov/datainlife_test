/* eslint-disable no-empty-pattern */
import React, { useState } from 'react';
import cn from 'classnames';
import Navigation from '../../components/navigation/navigation';
import styles from './page-main.module.scss';
import OffersTable from '../../components/offers-table/offers-table';
import Cart from '../../components/cart/cart';
import { postData } from '../../api/api';

function PageMain() {
  const [orderedOffers, setOrderedProduct] = useState({});
  const isEmpty = Object.keys(orderedOffers).length === 0;

  const handleAmountChange = ({ amount, id, price }) => {
    if (amount === 0) {
      setOrderedProduct((prev) => {
        const { [id]: {}, ...rest } = prev;
        return rest;
      });
      return;
    }

    setOrderedProduct((prev) => ({
      ...prev,
      [id]: {
        amount,
        totallSum: amount * price,
      },
    }));
  };

  const handleSendOrder = () => {
    const formData = new FormData();
    const data = Object.entries(orderedOffers);
    data.forEach((elem) => {
      formData.append(`product[${elem[0]}]`, elem[1].amount);
    });
    postData(formData);
  };

  return (
    <div className={cn('wrapper', styles.wrapper)}>
      <div className={styles.inner}>
        <nav className={styles.sidebar}>
          <Navigation />
        </nav>
        <section className={styles.content}>
          <OffersTable orderedOffers={orderedOffers} handleAmountChange={handleAmountChange} />
        </section>
      </div>
      <div className={cn(styles.cart, {
        [styles.cart__hidden]: isEmpty,
      })}
      >
        <Cart orderedOffers={orderedOffers} handleSendOrder={handleSendOrder} />
      </div>
    </div>
  );
}

export default PageMain;
