import { useGlobalContext } from 'context/GlobalContext';
import globalProps from 'lib/globalProps';
import { useEffect } from 'react';

// use the below component inside of Layout
interface ISamplePathHistoryUsageProps {}
const SamplePathHistoryUsage: React.FC<ISamplePathHistoryUsageProps> = ({}) => {
  const { pathHistory } = useGlobalContext();
  useEffect(() => {
    console.log('state', pathHistory);
    console.log('global outside setTimeout', globalProps.pathHistory);
    setTimeout(() => {
      console.log('global inside setTimeout', globalProps.pathHistory);
    });
  }, [pathHistory]);
  return null;
};
export default SamplePathHistoryUsage;
