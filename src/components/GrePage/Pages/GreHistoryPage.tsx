import { Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { useGlobalContext } from 'context/GlobalContext';
import {
  GreWordsQuery,
  useDeleteGptPromptMutation,
  useDeleteGreWordMutation,
  useGreWordsQuery,
} from 'gql/graphql';
import useQueryTracker from 'hooks/utils/useQueryTracker';
import { useWindowFocus } from 'hooks/utils/useWindowFocus';
import { ValueToDeleteQueryKey } from 'lib/queryParamsUtils';
import { useEffect, useMemo, useState } from 'react';

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
  const [deleteGreWord] = useDeleteGreWordMutation();

  const [deleteGptPrompt] = useDeleteGptPromptMutation();

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

  const handleDeleteGreWord = (greWord: GreWordsQuery['greWords'][number]) => {
    deleteGreWord({
      variables: {
        deleteGreWordId: greWord.id,
      },
      update(cache, { data }) {
        if (data?.deleteGreWord) {
          cache.modify({
            fields: {
              greWords(existingWords, { readField }) {
                return existingWords.filter((word: any) => {
                  return data.deleteGreWord?.id !== readField('id', word);
                });
              },
            },
          });
        }
      },
    });
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
      <div className="h-[50px] mt-4">
        {greWordsQueryResult.loading && <CircularProgress />}
      </div>
      <div>
        {greWordsQueryResult.data?.greWords.map((greWord) => {
          return (
            <Box
              key={greWord.id}
              sx={{ borderTop: '2px solid red', mt: 2, pt: 2 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography fontWeight={'bold'} fontSize={20}>
                  {greWord.spelling}
                </Typography>
                <IconButton
                  color="error"
                  onClick={() => {
                    handleDeleteGreWord(greWord);
                  }}
                >
                  <Delete />
                </IconButton>
              </Box>
              <div>
                <p>Gre Prompts</p>
                {greWord.gptPrompts.map((gptPrompt) => {
                  return (
                    <div key={gptPrompt.id}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <p>Input: {gptPrompt.input}</p>
                        <IconButton
                          color="error"
                          onClick={() => {
                            deleteGptPrompt({
                              variables: {
                                deleteGptPromptId: gptPrompt.id,
                              },
                              update(cache, { data }) {
                                if (data?.deleteGptPrompt) {
                                  cache.modify({
                                    id: cache.identify(greWord),
                                    fields: {
                                      gptPrompts(
                                        existingPrompts = [],
                                        { readField }
                                      ) {
                                        return existingPrompts.filter(
                                          (prompt: any) =>
                                            readField('id', prompt) !==
                                            gptPrompt.id
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
                      <p className="whitespace-pre-line border border-solid p-2 border-green-500">
                        {gptPrompt.response}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Box>
          );
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
