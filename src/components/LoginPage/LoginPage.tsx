import { useLazyQuery } from '@apollo/client';
import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { useGlobalContext } from 'context/GlobalContext';
import {
  UsersForLoginPageDocument,
  UsersForLoginPageQuery,
  UsersForLoginPageQueryVariables,
} from 'gql/graphql';
import { RedirectUrlQueryParam } from 'hooks/useUserRequired';
import { useRouter } from 'next/router';
import { useState } from 'react';

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
  const handleEmailSubmit = async () => {
    const { data } = await getUsersForLoginPage({
      variables: {
        where: { email: { equals: emailInput } },
      },
    });
    const users = data?.users;
    if (users && users.length > 0) {
      const user = users[0];
      setUser(user);
      if (typeof redirectUrl === 'string') {
        router.push(redirectUrl);
      } else {
        router.push('/');
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
            variant="contained"
            color="primary"
            onClick={handleEmailSubmit}
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
      </Box>
    </div>
  );
};
export default LoginPage;
