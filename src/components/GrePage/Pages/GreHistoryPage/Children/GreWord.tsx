import { Delete, Edit, Save } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import CustomTabs from 'components/Shared/CustomTabs/CustomTabs';
import {
  GreWordStatus,
  GreWordsQuery,
  useDeleteGptPromptMutation,
  useDeleteGreWordMutation,
  useUpdateGptPromptMutation,
  useUpdateGreWordMutation,
} from 'gql/graphql';
import { useEffect, useState } from 'react';
import { sortedGreWordStatuses } from '../GreHistoryPage';
import TagInput from './TagInput';

interface IGreWordProps {
  greWord: GreWordsQuery['greWords'][number];
  refetchQueries?: () => void;
}
export const GreWord: React.FC<IGreWordProps> = ({
  greWord,
  refetchQueries,
}) => {
  const [deleteGreWord, deleteGreWordResult] = useDeleteGreWordMutation();
  const [selectedTags, setSelectedTags] = useState(
    greWord.greWordTags?.map((t) => t.name) ?? []
  );

  useEffect(() => {
    setSelectedTags(greWord.greWordTags?.map((t) => t.name) ?? []);
  }, [greWord.greWordTags]);

  const [selectedStatus, setSelectedStatus] = useState(greWord.status);
  const [updateGreWord] = useUpdateGreWordMutation();

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
    <Box key={greWord.id} sx={{ borderTop: '2px solid gray', mt: 2, pt: 2 }}>
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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minWidth: 300,
            gap: 2,
          }}
        >
          <TagInput
            selectedTags={selectedTags}
            setSelectedTags={(tags) => {
              setSelectedTags(tags);
              // TODO: we are not updating the cache below
              updateGreWord({
                variables: {
                  updateGreWordId: greWord.id,
                  greWordTags: tags.map((t) => ({ name: t })),
                },
              }).then(() => {
                refetchQueries?.();
              });
            }}
          />
          <Select
            labelId="label"
            id="select"
            value={selectedStatus}
            onChange={(e) => {
              const newWordStatus = e.target.value as GreWordStatus;
              setSelectedStatus(newWordStatus);
              updateGreWord({
                variables: {
                  updateGreWordId: greWord.id,
                  status: newWordStatus,
                },
              }).then(() => {
                refetchQueries?.();
              });
            }}
          >
            {sortedGreWordStatuses.map((status) => {
              return (
                <MenuItem value={status} key={status}>
                  {status}
                </MenuItem>
              );
            })}
          </Select>
          <IconButton
            color="error"
            onClick={() => {
              handleDeleteGreWord(greWord);
            }}
            disabled={deleteGreWordResult.loading}
          >
            <Delete />
          </IconButton>
        </Box>
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
  const [deleteGptPrompt, deleteGptPromptResult] = useDeleteGptPromptMutation();

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
          disabled={deleteGptPromptResult.loading}
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
      {gptPrompt.editedResponse ? (
        <CustomTabs
          data={[
            {
              label: 'Edited Response',
              component: (
                <GptResponse
                  gptPromptId={gptPrompt.id}
                  response={gptPrompt.editedResponse ?? gptPrompt.response}
                />
              ),
            },
            {
              label: 'Response',
              component: (
                <GptResponse
                  gptPromptId={gptPrompt.id}
                  response={gptPrompt.response}
                />
              ),
            },
          ]}
        />
      ) : (
        <GptResponse
          gptPromptId={gptPrompt.id}
          response={gptPrompt.editedResponse ?? gptPrompt.response}
        />
      )}
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
  const [editModeActive, setEditModeActive] = useState(false);
  const [updateGptPrompt, { loading }] = useUpdateGptPromptMutation();

  const saveCurrentValue = () => {
    updateGptPrompt({
      variables: {
        id: gptPromptId,
        editedResponse: value,
      },
    }).then(() => {
      setEditModeActive(false);
    });
  };

  return (
    <div style={{ position: 'relative' }}>
      {loading && (
        <CircularProgress
          size={20}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
          }}
        />
      )}
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
          }}
        >
          {!editModeActive && (
            <IconButton
              onClick={() => {
                setEditModeActive(true);
              }}
            >
              <Edit />
            </IconButton>
          )}
          <IconButton
            onClick={saveCurrentValue}
            sx={{
              opacity: value !== response ? 1 : 0,
            }}
          >
            <Save />
          </IconButton>
        </Box>
        {editModeActive ? (
          <TextField
            fullWidth
            multiline
            variant="outlined"
            value={value}
            className="whitespace-pre-line"
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                setEditModeActive(false);
              }
              if (!event.shiftKey && event.key === 'Enter') {
                event.preventDefault();
                saveCurrentValue();
              }
            }}
            onChange={(event) => setValue(event.target.value)}
          />
        ) : (
          <p className="whitespace-pre-line m-0 p-0">{response}</p>
        )}
      </Box>
    </div>
  );
};
