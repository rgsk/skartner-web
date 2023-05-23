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
  useUpdateGptPromptMutation,
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

interface IGreWordProps {
  greWord: GreWordsQuery['greWords'][number];
}
export const GreWord: React.FC<IGreWordProps> = ({ greWord }) => {
  const [deleteGreWord] = useDeleteGreWordMutation();

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
    <Box key={greWord.id} sx={{ borderTop: '2px solid red', mt: 2, pt: 2 }}>
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
            <GptPrompt
              gptPrompt={gptPrompt}
              greWord={greWord}
              key={gptPrompt.id}
            />
          );
        })}
      </div>
    </Box>
  );
};

interface IGptPromptProps {
  greWord: GreWordsQuery['greWords'][number];
  gptPrompt: GreWordsQuery['greWords'][number]['gptPrompts'][number];
}
const GptPrompt: React.FC<IGptPromptProps> = ({ greWord, gptPrompt }) => {
  const [deleteGptPrompt] = useDeleteGptPromptMutation();

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
                      gptPrompts(existingPrompts = [], { readField }) {
                        return existingPrompts.filter(
                          (prompt: any) =>
                            readField('id', prompt) !== gptPrompt.id
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
      <GptResponse
        gptPromptId={gptPrompt.id}
        response={gptPrompt.editedResponse ?? gptPrompt.response}
      />
    </div>
  );
};

interface IGptResponseProps {
  response: string;
  gptPromptId: string;
}

export const GptResponse: React.FC<IGptResponseProps> = ({
  response,
  gptPromptId,
}) => {
  const [value, setValue] = useState(response);
  const [updateGptPrompt] = useUpdateGptPromptMutation();

  return (
    <TextField
      fullWidth
      multiline
      variant="outlined"
      value={value}
      className="whitespace-pre-line"
      onKeyDown={(event) => {
        if (!event.shiftKey && event.key === 'Enter') {
          event.preventDefault();
          updateGptPrompt({
            variables: {
              id: gptPromptId,
              editedResponse: value,
            },
          });
        }
      }}
      onChange={(event) => setValue(event.target.value)}
    />
  );
};
