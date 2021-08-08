import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { selectSection } from '../../store/slices/features/data/selectors';
import styles from './navigation.module.scss';
import { setCurrentMenu } from '../../store/slices/features/app/slice';

export default function Navigation() {
  const { pathname } = useLocation();
  const navigation = useSelector(selectSection);
  const dispatch = useDispatch();
  const handleLinkClick = (currentMenu) => {
    dispatch(setCurrentMenu(currentMenu));
  };

  return (
    <ul className={styles.list}>
      <li className={cn(styles.item, { [styles.item__active]: pathname === '/' })}>
        <Link onClick={() => handleLinkClick('/')} to="/">Все разделы</Link>
      </li>
      {navigation.map((elem) => {
        if (!elem.name) {
          return (
            <li key={elem.name} className={cn(styles.item, { [styles.item__active]: pathname === `/${elem.url}` })}>
              <Link onClick={() => handleLinkClick(elem.url)} to={elem.url}>Остальной товар</Link>
            </li>
          );
        }
        return (
          <li key={elem.name} className={cn(styles.item, { [styles.item__active]: pathname === `/${elem.url}` })}>
            <Link onClick={() => handleLinkClick(elem.url)} to={elem.url}>{elem.name}</Link>
          </li>
        );
      })}
    </ul>
  );
}
