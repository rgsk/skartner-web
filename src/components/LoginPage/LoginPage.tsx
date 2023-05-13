import { useLazyQuery } from '@apollo/client';
import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { useGlobalContext } from 'context/GlobalContext';
import {
  UsersForLoginPageDocument,
  UsersForLoginPageQuery,
  UsersForLoginPageQueryVariables,
} from 'gql/graphql';
import { RedirectUrlQueryParam } from 'hooks/auth/useUserRequired';
import { useRouter } from 'next/router';
import { FormEventHandler, useState } from 'react';

interface ILoginPageProps {}
const LoginPage: React.FC<ILoginPageProps> = ({}) => {
  const router = useRouter();
  const { [RedirectUrlQueryParam]: redirectUrl } = router.query;
  const [emailInput, setEmailInput] = useState('');
  const [getUsersForLoginPage, usersForLoginPageQueryResult] = useLazyQuery<
    UsersForLoginPageQuery,
    UsersForLoginPageQueryVariables
  >(UsersForLoginPageDocument);
  const { setUser } = useGlobalContext();
  const handleEmailSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const { data } = await getUsersForLoginPage({
      variables: {
        where: { email: { equals: emailInput } },
      },
    });
    const users = data?.users;
    if (users && users.length > 0) {
      const user = users[0];
      setUser(user);

      // here we are using router.replace
      // to ensure we get to previous page on browser back button click
      // rather than /login page
      if (typeof redirectUrl === 'string') {
        router.replace(redirectUrl);
      } else {
        router.replace('/');
      }
    }
  };
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '70vh',
        }}
      >
        <form onSubmit={handleEmailSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            value={emailInput}
            onChange={(e) => {
              setEmailInput(e.target.value);
            }}
            sx={{
              width: '400px',
              maxWidth: '90vw',
            }}
          />
          <Box sx={{ mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={usersForLoginPageQueryResult.loading}
              startIcon={
                usersForLoginPageQueryResult.loading ? (
                  <CircularProgress size={24} />
                ) : null
              }
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  );
};
export default LoginPage;
