import React from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import Navigation from '../../components/navigation/navigation';
import styles from './page-main.module.scss';
import OffersTable from '../../components/offers-table/offers-table';
import Cart from '../../components/cart/cart';
import { sendOrder, addPositionToCart, deletePositionFromCart } from '../../store/slices/features/data/slice';
import { selectOrderedOffers } from '../../store/slices/features/data/selectors';

function PageMain() {
  const orderedOffers = useSelector(selectOrderedOffers);
  const isEmpty = Object.keys(orderedOffers).length === 0;
  const dispatch = useDispatch();

  const handleAmountChange = ({ amount, id, price }) => {
    if (amount === 0) {
      dispatch(deletePositionFromCart({ amount, id, price }));
      return;
    }
    dispatch(addPositionToCart({ amount, id, price }));
  };

  const handleSendOrder = () => {
    const formData = new FormData();
    const data = Object.entries(orderedOffers);
    data.forEach((elem) => {
      formData.append(`product[${elem[0]}]`, elem[1].amount);
    });
    dispatch(sendOrder(data));
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
        <Cart handleSendOrder={handleSendOrder} />
      </div>
    </div>
  );
}

export default PageMain;
