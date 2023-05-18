import { useWindowFocus } from 'hooks/utils/useWindowFocus';
import { useEffect } from 'react';

const Page = () => {
  const { isWindowFocused } = useWindowFocus();
  useEffect(() => {
    console.log({ isWindowFocused });
  }, [isWindowFocused]);
  return <div>Page</div>;
};
export default Page;

// http://localhost:3001/prac2
