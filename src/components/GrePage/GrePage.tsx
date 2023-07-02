import { Cancel, Edit, ExpandMore, Send } from '@mui/icons-material';
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
  useCreateGptPromptMutation,
  useCreateGreWordMutation,
  useGreWordSearchPromptInputsQuery,
  useGreWordTagsQuery,
  useGreWordsLazyQuery,
  useSendSinglePromptLazyQuery,
  useUpdateGreWordMutation,
  useUpdateMetaForUserMutation,
} from 'gql/graphql';
import useQueryTracker from 'hooks/utils/useQueryTracker';
import useRunOnWindowFocus from 'hooks/utils/useRunOnWindowFocus';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import CustomPromptInput from './Children/CustomPromptInput';
import WordSearchPrompts from './Children/WordSearchPrompts/WordSearchPrompts';
import { GreWord } from './Pages/GreHistoryPage/Children/GreWord';
import TagInput from './Pages/GreHistoryPage/Children/TagInput';

const replaceWord = (word: string, prompt: string) => {
  return prompt.replace(/{word}/g, word);
};

enum QueryParams {
  tag = 'tag',
}

interface IGrePageProps {}
const GrePage: React.FC<IGrePageProps> = ({}) => {
  const [wordInput, setWordInput] = useState('');
  const { user, setUser } = useGlobalContext();
  const { greConfiguration } = useGreContext();
  const [updateMetaForUser] = useUpdateMetaForUserMutation();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [getGreWords, getGreWordsResult] = useGreWordsLazyQuery();
  const [createGptPrompt, createGptPromptMutationResult] =
    useCreateGptPromptMutation();
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
  const [updateGreWord] = useUpdateGreWordMutation();

  const greWordTagsQueryResult = useGreWordTagsQuery({
    variables: {
      where: {
        userId: {
          equals: user!.id,
        },
      },
    },
  });

  const validTagNames = greWordTagsQueryResult.data?.greWordTags.map(
    (t) => t.name
  );

  const [lastSubmittedWord, setLastSubmittedWord] = useState(wordInput);

  const queryTrackerInput = useMemo(() => {
    const result: any = {};
    result[QueryParams.tag] = selectedTags;
    return result;
  }, [selectedTags]);

  useQueryTracker(queryTrackerInput, ({ params }) => {
    const { [QueryParams.tag]: tagParam } = params;
    if (tagParam) {
      if (typeof tagParam === 'string') {
        if (validTagNames?.includes(tagParam)) {
          setSelectedTags([tagParam]);
        }
      } else {
        setSelectedTags(tagParam.filter((v) => !!validTagNames?.includes(v)));
      }
    } else {
      setSelectedTags([]);
    }
  });

  const savedGreWord = getGreWordsResult.data?.greWords[0];
  const refreshSavedGreWord = useCallback(() => {
    getGreWords({
      variables: {
        where: {
          spelling: {
            equals: wordInput,
          },
        },
      },
      fetchPolicy: 'network-only',
    });
  }, [getGreWords, wordInput]);
  const automaticallyTagsAssignedRef = useRef(false);
  useEffect(() => {
    if (savedGreWord && !automaticallyTagsAssignedRef.current) {
      automaticallyTagsAssignedRef.current = true;
      updateGreWord({
        variables: {
          updateGreWordId: savedGreWord.id,
          greWordTags: [
            ...selectedTags.map((t) => ({ name: t })),
            ...(savedGreWord.greWordTags?.map((t) => {
              return { name: t.name };
            }) ?? []),
          ],
        },
      }).then(() => {
        refreshSavedGreWord();
      });
    }
  }, [refreshSavedGreWord, savedGreWord, selectedTags, updateGreWord]);

  useRunOnWindowFocus(() => {
    refreshSavedGreWord();
    greWordTagsQueryResult.refetch();
  });

  const submitWord = async (prompt: string) => {
    if (wordInput) {
      sendSinglePrompt({
        variables: {
          input: replaceWord(wordInput, prompt),
        },
      }).then(() => {
        setLastSubmittedWord(wordInput);
      });
      refreshSavedGreWord();
    }
  };

  const tryingToSavePreviousResponseAgain = useMemo(() => {
    return (
      !!createGreWordMutationResult.data?.createGreWord.gptPrompts.some(
        (p) => p.response === sendSinglePromptQueryResult.data?.sendSinglePrompt
      ) ||
      createGptPromptMutationResult.data?.createGptPrompt.response ===
        sendSinglePromptQueryResult.data?.sendSinglePrompt
    );
  }, [
    createGptPromptMutationResult.data?.createGptPrompt.response,
    createGreWordMutationResult.data?.createGreWord.gptPrompts,
    sendSinglePromptQueryResult.data?.sendSinglePrompt,
  ]);

  const handleDefaultPromptInputTextChange = (newPromptInputText: string) => {
    if (user) {
      const { __typename, ...metaFields } = user.meta;
      updateMetaForUser({
        variables: {
          id: user.id,
          meta: {
            ...metaFields,
            defaultGreWordSearchPromptInput: newPromptInputText,
          },
        },
      }).then(({ data }) => {
        const updatedUser = data?.updateUser;
        if (updatedUser) {
          setUser(updatedUser);
        }
      });
    }
  };

  const handleWordSearch = () => {
    if (greConfiguration) {
      submitWord(
        user?.meta?.defaultGreWordSearchPromptInput ??
          greConfiguration.defaultGreWordSearchPromptInputs[0]
      );
    }
  };

  const renderSave = () => {
    return (
      <Button
        variant="contained"
        color="primary"
        disabled={
          createGreWordMutationResult.loading ||
          sendSinglePromptQueryResult.loading ||
          !wordInput ||
          wordInput !== lastSubmittedWord ||
          tryingToSavePreviousResponseAgain ||
          getGreWordsResult.loading
        }
        startIcon={
          createGreWordMutationResult.loading ? (
            <CircularProgress size={24} />
          ) : null
        }
        onClick={async () => {
          if (
            wordInput &&
            sendSinglePromptQueryResult.variables?.input &&
            sendSinglePromptQueryResult.data?.sendSinglePrompt &&
            !getGreWordsResult.loading
          ) {
            if (savedGreWord) {
              createGptPrompt({
                variables: {
                  greWordId: savedGreWord.id,
                  input: sendSinglePromptQueryResult.variables.input,
                  response: sendSinglePromptQueryResult.data.sendSinglePrompt,
                },
              }).then(() => {
                refreshSavedGreWord();
              });
            } else {
              createGreWord({
                variables: {
                  spelling: wordInput,
                  promptInput: sendSinglePromptQueryResult.variables.input,
                  promptResponse:
                    sendSinglePromptQueryResult.data.sendSinglePrompt,
                  userId: user!.id,
                  greWordTags: selectedTags.map((tagName) => ({
                    name: tagName,
                  })),
                },
              }).then(() => {
                refreshSavedGreWord();
              });
            }
          }
        }}
      >
        Save
      </Button>
    );
  };

  return (
    <div className="p-4">
      <Box sx={{ mb: 2 }}>
        <TagInput
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
      </Box>

      <Box>
        <TextField
          label="Word"
          variant="outlined"
          value={wordInput}
          onChange={(e) => {
            setWordInput(e.target.value.toLowerCase());
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleWordSearch();
            }
          }}
        />
        <IconButton
          size="large"
          onClick={() => {
            handleWordSearch();
          }}
        >
          <Send />
        </IconButton>
      </Box>
      <Box sx={{ mt: 2 }}>
        <CustomPromptInput
          submit={({ text }) => {
            submitWord(text);
          }}
        />
      </Box>
      <Box sx={{ mt: 3 }}>{renderSave()}</Box>
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
            {user?.meta?.showDefaultGreWordSearchPromptInputs ||
            greConfiguration?.defaultGreWordSearchPromptInputs.includes(
              user?.meta?.defaultGreWordSearchPromptInput!
            )
              ? greConfiguration?.defaultGreWordSearchPromptInputs.map(
                  (input, i) => {
                    return (
                      <PromptSelector
                        key={i + input}
                        checked={
                          user?.meta?.defaultGreWordSearchPromptInput ===
                            input ||
                          (!user?.meta?.defaultGreWordSearchPromptInput &&
                            i == 0)
                        }
                        promptInputText={input}
                        onCheckboxChange={(checked) => {
                          if (checked) {
                            handleDefaultPromptInputTextChange(input);
                          }
                        }}
                        onPromptInputClick={() => {
                          submitWord(input);
                        }}
                      />
                    );
                  }
                )
              : null}
            {greWordSearchPromptInputsQueryResult.data?.greWordSearchPromptInputs.map(
              (promptInput, i) => {
                return (
                  <PromptSelector
                    key={promptInput.id}
                    checked={
                      user?.meta?.defaultGreWordSearchPromptInput ===
                      promptInput.text
                    }
                    promptInputText={promptInput.text}
                    onCheckboxChange={(checked) => {
                      if (checked) {
                        handleDefaultPromptInputTextChange(promptInput.text);
                      }
                    }}
                    onPromptInputClick={() => {
                      submitWord(promptInput.text);
                    }}
                  />
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
      <Typography fontWeight={'bold'} variant="h5">
        {wordInput.toLowerCase()}
      </Typography>

      {savedGreWord && (
        <Box sx={{ mt: 5 }}>
          <Typography variant="h6">Saved Word</Typography>
          <GreWord greWord={savedGreWord} />
        </Box>
      )}

      <Box sx={{ border: '1px solid gray', mt: 5 }}></Box>

      <Box sx={{ mt: 5 }}>
        <Typography variant="h6">Search Result :</Typography>
        <Typography fontSize={18}>
          {sendSinglePromptQueryResult.variables?.input}
        </Typography>
        {sendSinglePromptQueryResult.loading && <CircularProgress />}
        <p className="whitespace-pre-line">
          {sendSinglePromptQueryResult.data?.sendSinglePrompt}
        </p>
        <Box sx={{ mt: 3 }}>{renderSave()}</Box>
      </Box>
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

interface IPromptSelectorProps {
  checked: boolean;
  onCheckboxChange: (checked: boolean) => void;
  promptInputText: string;
  onPromptInputClick: () => void;
}
const PromptSelector: React.FC<IPromptSelectorProps> = ({
  checked,
  onCheckboxChange,
  promptInputText,
  onPromptInputClick,
}) => {
  return (
    <Box>
      <Checkbox
        checked={checked}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const newValue = event.target.checked;
          // we can only select something as default
          onCheckboxChange(newValue);
        }}
      />
      <Button variant="text" onClick={onPromptInputClick}>
        {promptInputText}
      </Button>
    </Box>
  );
};
