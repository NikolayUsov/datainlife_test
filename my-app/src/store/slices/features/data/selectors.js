import { createSelector } from 'reselect';
import { NameSpace } from '../../../reducer/name-space';

const selectData = (state) => state[NameSpace.DATA].offers;
const selectOrderedOffers = (state) => state[NameSpace.DATA].orderedOffers;
const selectPostStatus = (state) => state[NameSpace.DATA].postDataStatus;

const selectSection = createSelector(
  selectData,
  (offers) => offers.map((offer) => ({
    name: offer.rname,
    url: offer.urlalias,
  })),
);

const selectOrderInfo = createSelector(
  selectOrderedOffers,
  (orderedOffers) => {
    const orderInfo = {
      counter: 0,
      sum: 0,
    };
    const arr = Object.values(orderedOffers);
    arr.forEach((elem) => {
      orderInfo.counter += elem.amount;
      orderInfo.sum += elem.totallSum;
    });
    return orderInfo;
  },
);

export {
  selectSection, selectData, selectPostStatus, selectOrderedOffers, selectOrderInfo,
};
