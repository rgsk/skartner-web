import { Cancel, Edit, ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { useGlobalContext } from 'context/GlobalContext';
import { useGreContext } from 'context/GreContext';
import {
  useCreateGreWordMutation,
  useGreWordSearchPromptInputsQuery,
  useSendSinglePromptLazyQuery,
  useUpdateMetaForUserMutation,
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
  const { user, userParsedMeta, metaFields, setUser } = useGlobalContext();
  const { greConfiguration } = useGreContext();
  const [updateMetaForUser] = useUpdateMetaForUserMutation();

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

  const handleDefaultPromptInputTextChange = (newPromptInputText: string) => {
    if (user && metaFields) {
      updateMetaForUser({
        variables: {
          id: user.id,
          meta: JSON.stringify({
            ...userParsedMeta,
            [metaFields.user.defaultGreWordSearchPromptInput]:
              newPromptInputText,
          }),
        },
      }).then(({ data }) => {
        const updatedUser = data?.updateUser;
        if (updatedUser) {
          setUser(updatedUser);
        }
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
              if (greConfiguration) {
                submitWord(
                  userParsedMeta?.defaultGreWordSearchPromptInput ??
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
      <Box sx={{ my: 4 }}>
        <CollapsibleComponent head="Prompts">
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton
              onClick={() => {
                setModifyingWordSearchPrompts((prev) => !prev);
              }}
            >
              <Edit />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
            }}
          >
            {userParsedMeta?.showDefaultGreWordSearchPromptInputs ||
            greConfiguration?.defaultGreWordSearchPromptInputs.includes(
              userParsedMeta?.defaultGreWordSearchPromptInput!
            )
              ? greConfiguration?.defaultGreWordSearchPromptInputs.map(
                  (input, i) => {
                    return (
                      <Box key={i}>
                        <Checkbox
                          checked={
                            userParsedMeta?.defaultGreWordSearchPromptInput ===
                              input ||
                            (!userParsedMeta?.defaultGreWordSearchPromptInput &&
                              i == 0)
                          }
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            const newValue = event.target.checked;
                            // we can only select something as default
                            if (newValue) {
                              handleDefaultPromptInputTextChange(input);
                            }
                          }}
                        />
                        <Button
                          variant="text"
                          onClick={() => {
                            submitWord(input);
                          }}
                        >
                          {input}
                        </Button>
                      </Box>
                    );
                  }
                )
              : null}
            {greWordSearchPromptInputsQueryResult.data?.greWordSearchPromptInputs.map(
              (promptInput, i) => {
                return (
                  <Box key={i}>
                    <Checkbox
                      checked={
                        userParsedMeta?.defaultGreWordSearchPromptInput ===
                        promptInput.text
                      }
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const newValue = event.target.checked;
                        if (newValue) {
                          handleDefaultPromptInputTextChange(promptInput.text);
                        }
                      }}
                    />
                    <Button
                      variant="text"
                      key={promptInput.id}
                      onClick={() => {
                        submitWord(promptInput.text);
                      }}
                    >
                      {promptInput.text}
                    </Button>
                  </Box>
                );
              }
            )}
          </Box>
          {modifyingWordSearchPrompts && (
            <Box sx={{ borderTop: '2px solid black', mt: 4, pt: 4 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'end',
                }}
              >
                <IconButton
                  onClick={() => {
                    setModifyingWordSearchPrompts(false);
                  }}
                  sx={{
                    m: 2,
                  }}
                >
                  <Cancel />
                </IconButton>
              </Box>
              <WordSearchPrompts />
            </Box>
          )}
        </CollapsibleComponent>
      </Box>
      {sendSinglePromptQueryResult.loading && <CircularProgress />}

      <p className="whitespace-pre-line">
        {sendSinglePromptQueryResult.data?.sendSinglePrompt}
      </p>
    </div>
  );
};
export default GrePage;

interface ICollapsibleComponentProps {
  head: string;
  children: any;
}

function CollapsibleComponent({ head, children }: ICollapsibleComponentProps) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h6">{head}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}
