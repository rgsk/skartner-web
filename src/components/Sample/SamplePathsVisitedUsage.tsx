import { useGlobalContext } from 'context/GlobalContext';
import globalProps from 'lib/globalProps';
import { useEffect } from 'react';

// use the below component inside of Layout
interface ISamplePathsVisitedUsageProps {}
const SamplePathsVisitedUsage: React.FC<
  ISamplePathsVisitedUsageProps
> = ({}) => {
  const { pathsVisited } = useGlobalContext();
  useEffect(() => {
    console.log('state', pathsVisited);
    console.log('global outside setTimeout', globalProps.pathsVisited);
    setTimeout(() => {
      console.log('global inside setTimeout', globalProps.pathsVisited);
    });
  }, [pathsVisited]);
  return null;
};
export default SamplePathsVisitedUsage;
