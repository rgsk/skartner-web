import { gql } from '@apollo/client';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useGlobalContext } from 'context/GlobalContext';
import { useCreateGreWordSearchPromptInputMutation } from 'gql/graphql';
import { useForm } from 'react-hook-form';

interface ICreateWordSearchPromptFormProps {
  open: boolean;
  onClose: () => void;
}

interface ICreateWordSearchPromptFormInputs {
  text: string;
}

const CreateWordSearchPromptForm: React.FC<
  ICreateWordSearchPromptFormProps
> = ({ open, onClose }) => {
  const { user } = useGlobalContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICreateWordSearchPromptFormInputs>();

  const [createGreWordSearchPromptInput, { loading: isCreating }] =
    useCreateGreWordSearchPromptInputMutation();

  const handleFormSubmit = async (
    formData: ICreateWordSearchPromptFormInputs
  ) => {
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
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Prompt</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            label="Text"
            {...register('text', { required: true })}
            error={!!errors.text}
            helperText={errors.text ? 'Text is required' : ''}
            sx={{ mb: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={isCreating}>
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateWordSearchPromptForm;
