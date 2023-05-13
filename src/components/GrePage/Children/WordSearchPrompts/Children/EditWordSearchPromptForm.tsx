import { gql } from '@apollo/client';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useUpdateGreWordSearchPromptInputMutation } from 'gql/graphql';
import { useForm } from 'react-hook-form';

interface IEditWordSearchPromptFormProps {
  open: boolean;
  onClose: () => void;
  promptInput?: {
    id: string;
    text: string;
  };
}

interface IEditWordSearchPromptFormInputs {
  text: string;
}
const EditWordSearchPromptForm: React.FC<IEditWordSearchPromptFormProps> = ({
  open,
  onClose,
  promptInput,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IEditWordSearchPromptFormInputs>();

  const [updateGreWordSearchPromptInput, { loading: isUpdating }] =
    useUpdateGreWordSearchPromptInputMutation();

  const handleFormSubmit = async (
    formData: IEditWordSearchPromptFormInputs
  ) => {
    try {
      await updateGreWordSearchPromptInput({
        variables: { text: formData.text, id: promptInput!.id },
        update: (cache, { data }) => {
          const updatedPromptInput = data?.updateGreWordSearchPromptInput;
          cache.modify({
            fields: {
              greWordSearchPromptInputs(existingPromptInputs = []) {
                const updatedPromptInputRef = cache.writeFragment({
                  data: updatedPromptInput,
                  fragment: gql`
                    fragment UpdatedPromptInput on GreWordSearchPromptInput {
                      id
                      text
                      userId
                    }
                  `,
                });

                return existingPromptInputs.map((promptInputRef: any) =>
                  promptInputRef.__ref === updatedPromptInputRef?.__ref
                    ? updatedPromptInputRef
                    : promptInputRef
                );
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
      <DialogTitle>Edit Prompt</DialogTitle>
      {promptInput && (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              label="Text"
              {...register('text', { required: true })}
              defaultValue={promptInput.text}
              error={!!errors.text}
              helperText={errors.text ? 'Text is required' : ''}
              sx={{ mb: 1 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={isUpdating}>
              Update
            </Button>
          </DialogActions>
        </form>
      )}
    </Dialog>
  );
};

export default EditWordSearchPromptForm;
