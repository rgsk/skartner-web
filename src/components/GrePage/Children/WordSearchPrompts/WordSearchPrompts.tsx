import { Delete, Edit } from '@mui/icons-material';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useGlobalContext } from 'context/GlobalContext';
import {
  useDeleteGreWordSearchPromptInputMutation,
  useGreWordSearchPromptInputsQuery,
} from 'gql/graphql';

const WordSearchPrompts: React.FC = () => {
  const { user } = useGlobalContext();
  const { data } = useGreWordSearchPromptInputsQuery({
    variables: {
      where: {
        userId: {
          equals: user!.id,
        },
      },
    },
    skip: !user,
  });

  const [deletePromptInput] = useDeleteGreWordSearchPromptInputMutation({
    update(cache, { data }) {
      if (data?.deleteGreWordSearchPromptInput) {
        cache.modify({
          fields: {
            greWordSearchPromptInputs(existingInputs, { readField }) {
              return existingInputs.filter((input: any) => {
                return (
                  data.deleteGreWordSearchPromptInput?.id !==
                  readField('id', input)
                );
              });
            },
          },
        });
      }
    },
  });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Text</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.greWordSearchPromptInputs.map((input) => (
            <TableRow key={input.id}>
              <TableCell>{input.id}</TableCell>
              <TableCell>{input.text}</TableCell>
              <TableCell>
                <IconButton>
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => {
                    deletePromptInput({ variables: { id: input.id } });
                  }}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WordSearchPrompts;
