import axiosInstance from 'lib/axiosInstance';
import environmentVars from 'lib/environmentVars';
import { useEffect } from 'react';

const Page = () => {
  useEffect(() => {
    console.log({ environmentVars });
    (async () => {
      const response = await axiosInstance.get(
        `${environmentVars.SKARTNER_SERVER}`
      );
      console.log(response.data);
    })();
  }, []);
  return (
    <div>
      <p>Welcome to Skartner - Your Learning Companion</p>
      <p>changed 123</p>
      <a href="http://app.skartner.com">Learn Vocabulary</a>
    </div>
  );
};
export default Page;
