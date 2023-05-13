import { Edit } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
} from '@mui/material';
import { useGlobalContext } from 'context/GlobalContext';
import {
  useCreateGreWordMutation,
  useGreWordSearchPromptInputsQuery,
  useSendSinglePromptLazyQuery,
} from 'gql/graphql';
import { useState } from 'react';
import WordSearchPrompts from './Children/WordSearchPrompts/WordSearchPrompts';
const wordSearchPrompts = [
  'list meaning and 3 easy example sentences for word - {word}',
  'list meaning in simple words and 3 easy example sentences for word - {word}',
];

const replaceWord = (word: string, prompt: string) => {
  return prompt.replace(/{word}/g, word);
};

interface IGrePageProps {}
const GrePage: React.FC<IGrePageProps> = ({}) => {
  const [wordInput, setWordInput] = useState('');
  const { user } = useGlobalContext();
  const [modifyingWordSearchPrompts, setModifyingWordSearchPrompts] =
    useState(false);
  const greWordSearchPromptInputsQueryResult =
    useGreWordSearchPromptInputsQuery({
      variables: {
        where: {
          userId: {
            equals: user!.id,
          },
        },
      },
      skip: !user,
    });
  const [sendSinglePrompt, sendSinglePromptQueryResult] =
    useSendSinglePromptLazyQuery();
  const [createGreWord, createGreWordMutationResult] = useCreateGreWordMutation(
    {
      onCompleted: (data) => {
        console.log(data);
      },
    }
  );
  const submitWord = async (prompt: string) => {
    if (wordInput) {
      sendSinglePrompt({
        variables: {
          input: replaceWord(wordInput, prompt),
        },
      });
    }
  };

  return (
    <div className="p-4">
      <Box>
        <TextField
          label="Word"
          variant="outlined"
          value={wordInput}
          onChange={(e) => {
            setWordInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              submitWord(wordSearchPrompts[0]);
            }
          }}
        />
      </Box>
      <Box>
        <IconButton
          onClick={() => {
            setModifyingWordSearchPrompts((prev) => !prev);
          }}
        >
          <Edit />
        </IconButton>
        <Box>
          {greWordSearchPromptInputsQueryResult.data?.greWordSearchPromptInputs.map(
            (promptInput) => {
              return (
                <Button
                  variant="text"
                  key={promptInput.id}
                  onClick={() => {
                    submitWord(promptInput.text);
                  }}
                >
                  {promptInput.text}
                </Button>
              );
            }
          )}
        </Box>
      </Box>
      {modifyingWordSearchPrompts && <WordSearchPrompts />}
      <div className="h-[50px] mt-4">
        {sendSinglePromptQueryResult.loading && <CircularProgress />}
      </div>

      <p className="whitespace-pre-line">
        {sendSinglePromptQueryResult.data?.sendSinglePrompt}
      </p>
      <button
        onClick={() => {
          if (
            wordInput &&
            sendSinglePromptQueryResult.variables?.input &&
            sendSinglePromptQueryResult.data?.sendSinglePrompt
          ) {
            createGreWord({
              variables: {
                spelling: wordInput,
                promptInput: sendSinglePromptQueryResult.variables?.input,
                promptResponse:
                  sendSinglePromptQueryResult.data?.sendSinglePrompt,
              },
            });
          }
        }}
      >
        Save
      </button>
    </div>
  );
};
export default GrePage;
