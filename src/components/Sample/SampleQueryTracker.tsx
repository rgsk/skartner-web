import useQueryTracker from 'hooks/utils/useQueryTracker';
import { useMemo, useState } from 'react';

enum QueryParams {
  page = 'page',
}
interface ISampleQueryTrackerProps {}
const SampleQueryTracker: React.FC<ISampleQueryTrackerProps> = ({}) => {
  const [page, setPage] = useState(1);
  const queryTrackerInput = useMemo(() => {
    const result: any = {};
    result[QueryParams.page] = page;
    return result;
  }, [page]);

  useQueryTracker(queryTrackerInput, ({ params }) => {
    const { [QueryParams.page]: pageParam } = params;
    if (pageParam) {
      setPage(Number(pageParam));
    }
  });

  return (
    <div>
      <p>Page: {page}</p>
      <button
        onClick={() => {
          setPage((prev) => prev + 1);
        }}
      >
        Increment
      </button>
    </div>
  );
};
export default SampleQueryTracker;
