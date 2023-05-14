import { Box, TextField } from '@mui/material';
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
  return (
    <div>
      <Box>
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
      </Box>
    </div>
  );
};
export default CustomPromptInput;
