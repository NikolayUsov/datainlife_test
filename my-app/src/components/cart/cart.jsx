import React from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import styles from './cart.module.scss';
import { selectPostStatus, selectOrderInfo } from '../../store/slices/features/data/selectors';
import { RequestStatus } from '../../utils/const';
import PropTypes from 'prop-types';

export default function Cart({ handleSendOrder }) {
  const postStatus = useSelector(selectPostStatus);
  const orderInfo = useSelector(selectOrderInfo);
  return (
    <div className={cn('wrapper', styles.cart)}>
      <p className={styles.information}>{`В корзине ${orderInfo.counter} товар на общую сумму ${orderInfo.sum}`}</p>
      <a href="#" onClick={handleSendOrder} className={styles.buttonOrder}>
        {postStatus === RequestStatus.LOADING ? 'Отправляю заказ' : 'Оформить заказ'}
      </a>
    </div>
  );
}

Cart.propTypes = {
  handleSendOrder: PropTypes.func.isRequired,
};