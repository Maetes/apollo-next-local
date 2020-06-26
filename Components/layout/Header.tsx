import Router from 'next/router';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { fancyLoadingBar } from './FancyLoadingBar';
import { User } from '@prisma/client';
import styles from './Header.module.css';
import Link from 'next/link';

export const GET_USER = gql`
  query getAllUser {
    allUsers {
      title
      nachname
      email
    }
  }
`;

fancyLoadingBar(Router);

const Header: React.FC = () => {
  const { loading, data } = useQuery<User>(GET_USER);

  // useEffect(() => {
  //   if (!user.username) {
  //     async () => {
  //       const response = await signin(user, dispatch);
  //       if (response.error) {
  //       } else {
  //         setCookieLocalStorage(response, () => {});
  //       }
  //     };
  //   }
  // }, []);

  return (
    <div>
      <ul className={styles.headerList}>
        <li>
          <Link href='/'>
            <a className={styles.active}>Home</a>
          </Link>
        </li>
        <li>
          <Link href='/blog'>
            <a>Blog</a>
          </Link>
        </li>
        <li>
          <Link href='/contact'>
            <a>Contact</a>
          </Link>
        </li>
        <li>
          {data && data.title && (
            <Link href='/cards'>
              <a>Cards</a>
            </Link>
          )}
        </li>
        <li className={styles.headerItemRight}>
          {!data?.email && (
            <Link href='/auth/auth'>
              <a>SignIn-/up</a>
            </Link>
          )}
          {data && data.title && (
            <Link href='/auth/auth'>
              <a>{data.nachname}</a>
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Header;
