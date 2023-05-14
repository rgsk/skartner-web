import { Edit } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
} from '@mui/material';
import { useGlobalContext } from 'context/GlobalContext';
import { useGreContext } from 'context/GreContext';
import {
  useCreateGreWordMutation,
  useGreWordSearchPromptInputsQuery,
  useSendSinglePromptLazyQuery,
} from 'gql/graphql';
import { useMemo, useState } from 'react';
import CustomPromptInput from './Children/CustomPromptInput';
import WordSearchPrompts from './Children/WordSearchPrompts/WordSearchPrompts';

const replaceWord = (word: string, prompt: string) => {
  return prompt.replace(/{word}/g, word);
};

interface IGrePageProps {}
const GrePage: React.FC<IGrePageProps> = ({}) => {
  const [wordInput, setWordInput] = useState('');
  const { user, userParsedMeta } = useGlobalContext();
  const { greConfiguration } = useGreContext();

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
  const [lastSubmittedWord, setLastSubmittedWord] = useState(wordInput);
  const submitWord = async (prompt: string) => {
    if (wordInput) {
      sendSinglePrompt({
        variables: {
          input: replaceWord(wordInput, prompt),
        },
      }).then(() => {
        setLastSubmittedWord(wordInput);
      });
    }
  };

  const tryingToSavePreviousResponseAgain = useMemo(() => {
    return !!createGreWordMutationResult.data?.createGreWord.gptPrompts.some(
      (p) => p.response === sendSinglePromptQueryResult.data?.sendSinglePrompt
    );
  }, [
    createGreWordMutationResult.data?.createGreWord,
    sendSinglePromptQueryResult.data?.sendSinglePrompt,
  ]);

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
              if (greConfiguration) {
                submitWord(
                  greConfiguration.defaultGreWordSearchPromptInputs[0]
                );
              }
            }
          }}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <CustomPromptInput
          submit={({ text }) => {
            submitWord(text);
          }}
        />
      </Box>
      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          disabled={
            createGreWordMutationResult.loading ||
            sendSinglePromptQueryResult.loading ||
            !wordInput ||
            wordInput !== lastSubmittedWord ||
            tryingToSavePreviousResponseAgain
          }
          startIcon={
            createGreWordMutationResult.loading ? (
              <CircularProgress size={24} />
            ) : null
          }
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
                  userId: user!.id,
                },
              });
            }
          }}
        >
          Save
        </Button>
      </Box>
      <Box>
        <IconButton
          onClick={() => {
            setModifyingWordSearchPrompts((prev) => !prev);
          }}
        >
          <Edit />
        </IconButton>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {userParsedMeta?.showDefaultGreWordSearchPromptInputs &&
            greConfiguration?.defaultGreWordSearchPromptInputs.map(
              (input, i) => {
                return (
                  <Button
                    variant="text"
                    key={i}
                    onClick={() => {
                      submitWord(input);
                    }}
                  >
                    {input}
                  </Button>
                );
              }
            )}
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
      {sendSinglePromptQueryResult.loading && <CircularProgress />}

      <p className="whitespace-pre-line">
        {sendSinglePromptQueryResult.data?.sendSinglePrompt}
      </p>
    </div>
  );
};
export default GrePage;
