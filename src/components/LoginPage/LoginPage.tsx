import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { useGlobalContext } from 'context/GlobalContext';
import { useCreateUserMutation, useUserLazyQuery } from 'gql/graphql';
import { RedirectUrlQueryParam } from 'hooks/auth/useUserRequired';
import { useRouter } from 'next/router';
import { FormEventHandler, useState } from 'react';

interface ILoginPageProps {}
const LoginPage: React.FC<ILoginPageProps> = ({}) => {
  const router = useRouter();
  const { [RedirectUrlQueryParam]: redirectUrl } = router.query;
  const [emailInput, setEmailInput] = useState('');
  const [getUser, userQueryResult] = useUserLazyQuery();
  const { setUser } = useGlobalContext();

  const [createUser, createUserMutationResult] = useCreateUserMutation();

  const redirectUser = () => {
    // here we are using router.replace
    // to ensure we get to previous page on browser back button click
    // rather than /login page
    if (typeof redirectUrl === 'string') {
      router.replace(redirectUrl);
    } else {
      router.replace('/');
    }
  };

  const handleEmailSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const { data } = await getUser({
      variables: {
        where: { email: emailInput },
      },
    });
    const user = data?.user;
    if (user) {
      setUser(user);
      redirectUser();
    } else {
      const result = await createUser({
        variables: {
          email: emailInput,
        },
      });
      const user = result.data?.createUser;
      if (user) {
        setUser(user);
        redirectUser();
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
              disabled={userQueryResult.loading}
              startIcon={
                userQueryResult.loading ? <CircularProgress size={24} /> : null
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
