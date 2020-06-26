import Header from './Header';
import Footer from './Footer';

import styles from './Body.module.css';
import { FieldsOnCorrectTypeRule } from 'graphql';
const Body = ({ children }: { children: JSX.Element }) => {
  return (
    <div className={styles.global}>
      <Header />
      <div className={styles.behaviour}>{children}</div>
      <Footer />
    </div>
  );
};

export default Body;
