import { useMutation, useQuery } from '@apollo/client';
import { Box, Button, CircularProgress, TextField } from '@mui/material';
import {
  CreateGreWordDocument,
  CreateGreWordMutation,
  CreateGreWordMutationVariables,
  SendSinglePromptDocument,
  SendSinglePromptQuery,
  SendSinglePromptQueryVariables,
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
  const sendSinglePromptQueryResult = useQuery<
    SendSinglePromptQuery,
    SendSinglePromptQueryVariables
  >(SendSinglePromptDocument);
  const [createGreWordMutationFunction, createGreWordMutationResult] =
    useMutation<CreateGreWordMutation, CreateGreWordMutationVariables>(
      CreateGreWordDocument,
      {
        onCompleted: (data) => {
          console.log(data);
        },
      }
    );
  const submitWord = async (prompt: string) => {
    if (wordInput) {
      sendSinglePromptQueryResult.refetch({
        input: replaceWord(wordInput, prompt),
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
      <div>
        {wordSearchPrompts.map((prompt, i) => (
          <Button
            variant="text"
            key={i}
            onClick={() => {
              submitWord(wordSearchPrompts[i]);
            }}
          >
            {prompt}
          </Button>
        ))}
      </div>
      <WordSearchPrompts />
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
            createGreWordMutationFunction({
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
