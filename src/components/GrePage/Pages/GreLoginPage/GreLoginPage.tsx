import { useLazyQuery } from '@apollo/client';
import { Box, Button, CircularProgress, TextField } from '@mui/material';
import {
  UsersForLoginPageDocument,
  UsersForLoginPageQuery,
  UsersForLoginPageQueryVariables,
} from 'gql/graphql';
import { useState } from 'react';

interface IGreLoginPageProps {}
const GreLoginPage: React.FC<IGreLoginPageProps> = ({}) => {
  const [emailInput, setEmailInput] = useState('');
  const [getUsersForLoginPage, usersForLoginPageQueryResult] = useLazyQuery<
    UsersForLoginPageQuery,
    UsersForLoginPageQueryVariables
  >(UsersForLoginPageDocument);
  const handleEmailSubmit = async () => {
    const { data } = await getUsersForLoginPage({
      variables: {
        where: { email: { equals: emailInput } },
      },
    });
    const users = data?.users;
    if (users && users.length > 0) {
      console.log(users[0]);
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
export default GreLoginPage;
