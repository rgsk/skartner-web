import {
  Close,
  Error as ErrorIcon,
  Info as InfoIcon,
  Check as SuccessIcon,
  Undo,
  Warning as WarningIcon,
} from '@mui/icons-material';
import {
  Box,
  IconButton,
  Snackbar,
  SnackbarContent,
  useTheme,
} from '@mui/material';
import { useGlobalContext } from 'context/GlobalContext';
import { useEffect, useState } from 'react';
export type NotificationType = 'success' | 'info' | 'warning' | 'error';

export interface NotificationOptions {
  // The duration in milliseconds the notification is shown
  autoHideDuration?: number;
  // Arguments used to translate the message
  messageArgs?: any;
  // If true, the notification shows the message in multiple lines
  multiLine?: boolean;
  // If true, the notification shows an Undo button
  undoable?: boolean;
  type?: NotificationType;
  handleUndo?: () => void;
}
interface INotificationProps {}

const Notification: React.FC<INotificationProps> = ({}) => {
  const { notification } = useGlobalContext();
  const theme = useTheme();

  const {
    autoHideDuration = 4000,
    multiLine = false,
    undoable = false,
    type = 'info',
    message,
    handleUndo,
    messageArgs,
  } = notification ?? {};
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (notification) {
      handleOpen();
    }
  }, [notification]);

  const getMessageIcon = () => {
    switch (type) {
      case 'success':
        return <SuccessIcon />;
      case 'info':
        return <InfoIcon />;
      case 'warning':
        return <WarningIcon />;
      case 'error':
        return <ErrorIcon />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
      >
        <SnackbarContent
          sx={{
            backgroundColor: theme.palette[type].main,
          }}
          message={
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center',
              }}
            >
              {getMessageIcon()}
              <span>{message}</span>
            </Box>
          }
          action={
            <>
              {undoable && (
                <IconButton
                  size="small"
                  color="inherit"
                  onClick={() => {
                    handleUndo?.();
                    handleClose();
                  }}
                >
                  <Undo fontSize="small" />
                </IconButton>
              )}
              <IconButton size="small" color="inherit" onClick={handleClose}>
                <Close fontSize="small" />
              </IconButton>
            </>
          }
        />
      </Snackbar>
    </div>
  );
};

export default Notification;
