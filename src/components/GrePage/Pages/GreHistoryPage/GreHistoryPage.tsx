import {
  Box,
  Chip,
  CircularProgress,
  Pagination,
  TextField,
} from '@mui/material';
import { useGlobalContext } from 'context/GlobalContext';
import {
  GreWordStatus,
  useGreWordsQuery,
  useStatusWiseGreWordCountQuery,
} from 'gql/graphql';
import useQueryTracker from 'hooks/utils/useQueryTracker';
import useRunOnWindowFocus from 'hooks/utils/useRunOnWindowFocus';
import { ValueToDeleteQueryKey } from 'lib/queryParamsUtils';
import { useEffect, useMemo, useState } from 'react';
import { GreWord } from './Children/GreWord';

enum QueryParams {
  page = 'page',
  query = 'query',
  status = 'status',
}

const itemsPerPage = 5;

const sortedGreWordStatuses = [
  GreWordStatus.StartedLearning,
  GreWordStatus.StillLearning,
  GreWordStatus.AlmostLearnt,
  GreWordStatus.FinishedLearning,
  GreWordStatus.MemoryMode,
  GreWordStatus.Mastered,
];

interface IGreHistoryPageProps {}
const GreHistoryPage: React.FC<IGreHistoryPageProps> = ({}) => {
  const { user } = useGlobalContext();
  const [queryInput, setQueryInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<GreWordStatus[]>(
    sortedGreWordStatuses
  );

  const handleOptionToggle = (option: GreWordStatus) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(
        selectedOptions.filter((selectedOption) => selectedOption !== option)
      );
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const greWordsQueryResult = useGreWordsQuery({
    variables: {
      where: {
        spelling: { startsWith: queryInput },
        userId: { equals: user!.id },
        status: {
          in: selectedOptions,
        },
      },
      skip: (currentPage - 1) * itemsPerPage,
      take: itemsPerPage,
    },
  });

  const statusWiseGreWordCountResult = useStatusWiseGreWordCountQuery({
    variables: { userId: user!.id },
  });

  useRunOnWindowFocus(greWordsQueryResult.refetch);

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
    if (selectedOptions.length === sortedGreWordStatuses.length) {
      result[QueryParams.status] = ValueToDeleteQueryKey;
    } else {
      result[QueryParams.status] = selectedOptions;
    }
    return result;
  }, [currentPage, queryInput, selectedOptions]);

  useQueryTracker(queryTrackerInput, ({ params, onParamsAssignedToState }) => {
    const {
      [QueryParams.page]: pageParam,
      [QueryParams.query]: queryParam,
      [QueryParams.status]: statusParam,
    } = params;
    if (typeof pageParam === 'string') {
      setCurrentPage(+pageParam);
    }
    if (typeof queryParam === 'string') {
      setQueryInput(queryParam);
    }
    if (statusParam) {
      if (typeof statusParam === 'string') {
        setSelectedOptions([statusParam as GreWordStatus]);
      } else {
        setSelectedOptions(statusParam as GreWordStatus[]);
      }
    }
    onParamsAssignedToState();
  });

  const renderPagination = () => {
    return (
      <Pagination
        count={totalPages} // Set the total number of pages
        page={currentPage} // Set the current page
        onChange={(event, newPage) => {
          setCurrentPage(newPage);
        }} // Handle page changes
        shape="rounded"
        variant="outlined"
        color="primary"
        showFirstButton
        showLastButton
      />
    );
  };

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
      <Box
        sx={{
          my: 2,
        }}
      >
        {renderPagination()}
      </Box>
      <Box>
        {sortedGreWordStatuses.map((option) => (
          <Chip
            key={option}
            label={`${option} (${
              statusWiseGreWordCountResult.data?.[option] || 0
            }) `}
            clickable
            color={selectedOptions.includes(option) ? 'primary' : 'default'}
            onClick={() => handleOptionToggle(option)}
            style={{ margin: '4px' }}
          />
        ))}
      </Box>
      <div className="h-[50px] mt-4">
        {greWordsQueryResult.loading && <CircularProgress />}
      </div>
      <div>
        {greWordsQueryResult.data?.greWords.map((greWord) => {
          return <GreWord key={greWord.id} greWord={greWord} />;
        })}
      </div>
      <Box
        sx={{
          my: 2,
        }}
      >
        {renderPagination()}
      </Box>
    </div>
  );
};
export default GreHistoryPage;
