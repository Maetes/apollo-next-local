import { initializeApollo } from '../apollo/useApollo';
import Body from '../Components/layout/Body';
import { GET_USER } from '../Components/layout/Header';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const SET_CURRENT_USER = gql`
  mutation setCurrentUser(
    $email: String!
    $nachname: String!
    $title: String!
  ) {
    currentUser(email: $email, nachname: $nachname, title: $title) @client
  }
`;

export const GET_CURRENT_USER = gql`
  query getCurrentUser {
    getCurrentUser @client {
      email
      nachname
      title
    }
  }
`;

const IndexPage = () => {
  const [setCurrentUser] = useMutation(SET_CURRENT_USER);
  const { loading, error, data } = useQuery(GET_CURRENT_USER);
  return (
    <Body>
      <>
        <div className=''>This is the Index page</div>
        <button
          onClick={async () => {
            const test = await setCurrentUser({
              variables: { email: 'o@o.com', nachname: 'nn', title: 'end' },
            });
            return console.log(
              'execute: ',
              test,
              'loading, error:',
              loading,
              error,
              'data: ' + data
            );
          }}
        >
          PressMe
        </button>
      </>
    </Body>
  );
};

// export async function getStaticProps() {
//   const apolloClient = initializeApollo();

//   await apolloClient.query({
//     query: GET_USER,
//   });

//   return {
//     props: {
//       initialApolloState: apolloClient.cache.extract(),
//     },
//     unstable_revalidate: 1,
//   };
// }

export default IndexPage;
