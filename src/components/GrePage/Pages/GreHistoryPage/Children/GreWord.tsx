import { Delete } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import {
  GreWordsQuery,
  useDeleteGptPromptMutation,
  useDeleteGreWordMutation,
  useUpdateGptPromptMutation,
} from 'gql/graphql';
import { useState } from 'react';

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
  const [updateGptPrompt, { loading }] = useUpdateGptPromptMutation();

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
    </div>
  );
};
