import { Close as CloseIcon } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Snackbar,
  SnackbarContent,
} from '@mui/material';
import Link from 'components/Sample/Link';
import { useGlobalContext } from 'context/GlobalContext';
import { useNotificationReceivedSubscription } from 'gql/graphql';
import { useEffect, useState } from 'react';
interface INavbarProps {}
const Navbar: React.FC<INavbarProps> = ({}) => {
  const { user, setUser } = useGlobalContext();
  const handleLogout = () => {
    setUser(null);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        p: 2,
      }}
    >
      <Notification />
      <Link href="/">{user?.email}</Link>
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};
export default Navbar;

interface INotificationProps {}
const Notification: React.FC<INotificationProps> = ({}) => {
  const [open, setOpen] = useState(false);
  const { user } = useGlobalContext();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { data } = useNotificationReceivedSubscription({
    variables: { userId: user?.id ?? '' },
    skip: !user,
  });
  useEffect(() => {
    if (data) {
      handleOpen();
    }
  }, [data]);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={3000} // Adjust the duration as needed
      onClose={handleClose}
    >
      <SnackbarContent
        message={data?.notificationReceived?.message}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Snackbar>
  );
};
