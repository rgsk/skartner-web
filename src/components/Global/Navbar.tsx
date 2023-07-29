import { Box, Button } from '@mui/material';
import Link from 'components/Sample/Link';
import { useGlobalContext } from 'context/GlobalContext';
import useResizeObserver from 'hooks/utils/useResizeObserver';
import { useEffect, useRef } from 'react';
interface INavbarProps {}
const Navbar: React.FC<INavbarProps> = ({}) => {
  const { user, setUser, setNavbarRect } = useGlobalContext();
  const navbarRef = useRef<HTMLDivElement>(null);
  const localNavbarRect = useResizeObserver(navbarRef);
  useEffect(() => {
    setNavbarRect(localNavbarRect);
  }, [localNavbarRect, setNavbarRect]);
  const handleLogout = () => {
    setUser(null);
  };
  return (
    <Box sx={{ border: '1px solid red' }} ref={navbarRef}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: 2,
        }}
      >
        {user ? <Link href="/">{user?.email}</Link> : <Box />}
        {user ? (
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Link href="/login">
            <Button variant="contained">Login</Button>
          </Link>
        )}
      </Box>
    </Box>
  );
};
export default Navbar;
