import { Delete } from '@mui/icons-material';
import {
  Box,
  Checkbox,
  Chip,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  IconButton,
  Pagination,
  TextField,
  Typography,
} from '@mui/material';
import { useGlobalContext } from 'context/GlobalContext';
import {
  GreWordStatus,
  useDeleteGreWordTagMutation,
  useGreWordTagsQuery,
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
  tag = 'tag',
}

const itemsPerPage = 5;

export const sortedGreWordStatuses = [
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
  const [selectedStatuses, setSelectedStatuses] = useState<GreWordStatus[]>(
    sortedGreWordStatuses
  );

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const greWordTagsQueryResult = useGreWordTagsQuery({
    variables: {
      where: {
        userId: {
          equals: user!.id,
        },
      },
    },
  });
  const greWordTags = greWordTagsQueryResult.data?.greWordTags ?? [];

  const handleStatusToggle = (status: GreWordStatus) => {
    if (selectedStatuses.includes(status)) {
      setSelectedStatuses(selectedStatuses.filter((s) => s !== status));
    } else {
      setSelectedStatuses([...selectedStatuses, status]);
    }
  };
  const [deleteGreWordTag] = useDeleteGreWordTagMutation();
  const handleTagsToggle = (tagName: string) => {
    if (selectedTags.includes(tagName)) {
      setSelectedTags(selectedTags.filter((t) => t !== tagName));
    } else {
      setSelectedTags([...selectedTags, tagName]);
    }
  };

  const greWordsQueryResult = useGreWordsQuery({
    variables: {
      where: {
        spelling: { startsWith: queryInput },
        userId: { equals: user!.id },
        status: {
          in: selectedStatuses,
        },
        greWordTagId: {
          in: selectedTags.length
            ? selectedTags.map(
                (tagName) => greWordTags.find((t) => t.name === tagName)!.id
              )
            : undefined,
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
    if (selectedStatuses.length === sortedGreWordStatuses.length) {
      result[QueryParams.status] = ValueToDeleteQueryKey;
    } else {
      result[QueryParams.status] = selectedStatuses;
    }
    result[QueryParams.tag] = selectedTags;
    return result;
  }, [currentPage, queryInput, selectedStatuses, selectedTags]);

  useQueryTracker(queryTrackerInput, ({ params, onParamsAssignedToState }) => {
    const {
      [QueryParams.page]: pageParam,
      [QueryParams.query]: queryParam,
      [QueryParams.status]: statusParam,
      [QueryParams.tag]: tagParam,
    } = params;
    if (typeof pageParam === 'string') {
      setCurrentPage(+pageParam);
    }
    if (typeof queryParam === 'string') {
      setQueryInput(queryParam);
    }
    if (statusParam) {
      if (typeof statusParam === 'string') {
        setSelectedStatuses([statusParam as GreWordStatus]);
      } else {
        setSelectedStatuses(statusParam as GreWordStatus[]);
      }
    }
    if (tagParam) {
      if (typeof tagParam === 'string') {
        setSelectedTags([tagParam as GreWordStatus]);
      } else {
        setSelectedTags(tagParam as GreWordStatus[]);
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
            color={selectedStatuses.includes(option) ? 'primary' : 'default'}
            onClick={() => handleStatusToggle(option)}
            style={{ margin: '4px' }}
          />
        ))}
      </Box>
      <Box>
        <FormGroup>
          {greWordTags.map((greWordTag) => (
            <Box key={greWordTag.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedTags.includes(greWordTag.name)}
                    onChange={() => handleTagsToggle(greWordTag.name)}
                  />
                }
                label={greWordTag.name}
              />
              <IconButton
                onClick={() => {
                  deleteGreWordTag({
                    variables: {
                      name: greWordTag.name,
                    },
                    update: (cache, { data }) => {
                      if (data?.deleteGreWordTag) {
                        cache.modify({
                          fields: {
                            greWordTags(existingTags = [], { readField }) {
                              return existingTags.filter(
                                (tagRef: any) =>
                                  greWordTag.name !== readField('name', tagRef)
                              );
                            },
                          },
                        });
                      }
                    },
                  });
                }}
              >
                <Delete />
              </IconButton>
            </Box>
          ))}
        </FormGroup>
      </Box>
      <Box>
        <Typography>
          Total - {greWordsQueryResult.data?.greWordsCount}
        </Typography>
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
