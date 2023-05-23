import { Button, CircularProgress, TextField } from '@mui/material';
import { useGlobalContext } from 'context/GlobalContext';
import { useGreWordsQuery } from 'gql/graphql';
import useQueryTracker from 'hooks/utils/useQueryTracker';
import { useWindowFocus } from 'hooks/utils/useWindowFocus';
import { ValueToDeleteQueryKey } from 'lib/queryParamsUtils';
import { useEffect, useMemo, useState } from 'react';
import { GreWord } from './Children/GreWord';

enum QueryParams {
  page = 'page',
  query = 'query',
}

const itemsPerPage = 5;

interface IGreHistoryPageProps {}
const GreHistoryPage: React.FC<IGreHistoryPageProps> = ({}) => {
  const { user } = useGlobalContext();
  const [queryInput, setQueryInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { isWindowFocused } = useWindowFocus();

  const greWordsQueryResult = useGreWordsQuery({
    variables: {
      where: {
        spelling: { startsWith: queryInput },
        userId: { equals: user!.id },
      },
      skip: (currentPage - 1) * itemsPerPage,
      take: itemsPerPage,
    },
  });
  const refetchGreWords = greWordsQueryResult.refetch;
  useEffect(() => {
    if (isWindowFocused) {
      refetchGreWords();
    }
  }, [isWindowFocused, refetchGreWords]);

  const totalPages = useMemo(
    () =>
      Math.ceil((greWordsQueryResult.data?.greWordsCount ?? 0) / itemsPerPage),
    [greWordsQueryResult.data?.greWordsCount]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [queryInput]);

  const queryTrackerInput = useMemo(() => {
    const result: any = {};
    result[QueryParams.page] = currentPage;
    if (queryInput) {
      result[QueryParams.query] = queryInput;
    } else {
      result[QueryParams.query] = ValueToDeleteQueryKey;
    }
    return result;
  }, [currentPage, queryInput]);

  useQueryTracker(queryTrackerInput, ({ params, onParamsAssignedToState }) => {
    const { [QueryParams.page]: pageParam, [QueryParams.query]: queryParam } =
      params;
    if (typeof pageParam === 'string') {
      setCurrentPage(+pageParam);
    }
    if (typeof queryParam === 'string') {
      setQueryInput(queryParam);
    }
    onParamsAssignedToState();
  });

  return (
    <div className="p-4">
      <div>
        <TextField
          label="Word"
          value={queryInput}
          onChange={(e) => {
            setQueryInput(e.target.value);
          }}
        />
      </div>
      <div className="h-[50px] mt-4">
        {greWordsQueryResult.loading && <CircularProgress />}
      </div>
      <div>
        {greWordsQueryResult.data?.greWords.map((greWord) => {
          return <GreWord key={greWord.id} greWord={greWord} />;
        })}
      </div>
      <div>
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          return (
            <Button
              key={page}
              variant={page === currentPage ? 'outlined' : 'text'}
              onClick={() => {
                setCurrentPage(page);
              }}
            >
              {page}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
export default GreHistoryPage;
