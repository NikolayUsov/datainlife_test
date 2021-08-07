/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import { selectData } from '../../store/slices/features/data/selectors';
import styles from './offers-table.module.scss';

const getVisibleOffers = (path, offers) => {
  if (path === '/') {
    return offers;
  }
  return offers.filter((offer) => `/${offer.urlalias}` === path);
};

export default function OffersTable({ handleAmountChange, orderedOffers }) {
  const allOffers = useSelector(selectData);
  const { pathname } = useLocation();
  const visibleOffers = getVisibleOffers(pathname, allOffers);
  return (
    <div>
      {visibleOffers.map((section) => (
        <table key={section.rid} className={styles.table}>
          <tbody>
            <tr>
              <td colSpan="5">
                {' '}
                {section.rname}
                {' '}
              </td>
            </tr>
            <tr>
              <td>ID</td>
              <td>Название товара</td>
              <td>Цена</td>
              <td>Количество</td>
              <td>Сумма</td>
            </tr>
            {section.goods.map(({ gid, gname, gprice }) => {
              const amount = orderedOffers[gid]?.amount || 0;
              const totallSum = orderedOffers[gid]?.totallSum || 0;
              return (
                <tr>
                  <td>{gid}</td>
                  <td>{gname}</td>
                  <td>{gprice}</td>
                  <td>
                    <input
                      onInput={(evt) => handleAmountChange({
                        amount: Number(evt.target.value),
                        id: gid,
                        price: Number(gprice),
                      })}
                      id="amount"
                      type="number"
                      min="0"
                      step="1"
                      value={amount}
                    />
                  </td>
                  <td>{totallSum}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ))}

    </div>
  );
}

OffersTable.propTypes = {
  handleAmountChange: PropTypes.func.isRequired,
  orderedOffers: PropTypes.objectOf(PropTypes.number),
};

OffersTable.defaultProps = {
  orderedOffers: {},
};
