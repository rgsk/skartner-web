import { gql } from '@apollo/client';
import { Save, Send } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';
import { useGlobalContext } from 'context/GlobalContext';
import { useCreateGreWordSearchPromptInputMutation } from 'gql/graphql';
import { SubmitHandler, useForm } from 'react-hook-form';
interface FormInput {
  text: string;
}
interface ICustomPromptInputProps {
  submit: SubmitHandler<FormInput>;
}
const CustomPromptInput: React.FC<ICustomPromptInputProps> = ({ submit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInput>();
  const { user } = useGlobalContext();

  const [createGreWordSearchPromptInput, { loading: isCreating }] =
    useCreateGreWordSearchPromptInputMutation();

  const handleSave = async (formData: FormInput) => {
    try {
      await createGreWordSearchPromptInput({
        variables: { text: formData.text, userId: user!.id },
        update: (cache, { data }) => {
          const newPromptInput = data?.createGreWordSearchPromptInput;
          cache.modify({
            fields: {
              greWordSearchPromptInputs(existingPromptInputs = []) {
                const newPromptInputRef = cache.writeFragment({
                  data: newPromptInput,
                  fragment: gql`
                    fragment NewPromptInput on GreWordSearchPromptInput {
                      id
                      text
                      userId
                    }
                  `,
                });

                return [newPromptInputRef, ...existingPromptInputs];
              },
            },
          });
        },
      });
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <form onSubmit={handleSubmit(submit)}>
          <TextField
            label="Text"
            {...register('text', {
              required: true,
              pattern: /.*\{word\}.*/,
            })}
            error={!!errors.text}
            helperText={
              errors.text
                ? 'Text is required and must contain the string "{word}"'
                : 'Text must contain the string "{word}"'
            }
            sx={{ mb: 1, minWidth: '50vw' }}
          />
        </form>
        <Box
          sx={{
            display: 'flex',
            flex: 1,
          }}
        >
          <IconButton size="large" onClick={handleSubmit(submit)}>
            <Send />
          </IconButton>
          <IconButton size="large" onClick={handleSubmit(handleSave)}>
            <Save />
          </IconButton>
        </Box>
      </Box>
    </div>
  );
};
export default CustomPromptInput;
