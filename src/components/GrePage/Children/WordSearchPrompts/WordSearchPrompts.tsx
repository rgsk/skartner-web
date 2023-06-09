import { Add, Delete, Edit } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
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
import { useGreContext } from 'context/GreContext';
import {
  useDeleteGreWordSearchPromptInputMutation,
  useGreWordSearchPromptInputsQuery,
  useUpdateMetaForUserMutation,
} from 'gql/graphql';
import { useState } from 'react';
import CreateWordSearchPromptForm from './Children/CreateWordSearchPromptForm';
import EditWordSearchPromptForm from './Children/EditWordSearchPromptForm';

const WordSearchPrompts: React.FC = () => {
  const { user, setUser } = useGlobalContext();
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const { greConfiguration } = useGreContext();

  const [editedPromptInput, setEditedPromptInput] = useState<{
    id: string;
    text: string;
  } | null>(null);
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
  const [updateMetaForUser] = useUpdateMetaForUserMutation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (user) {
      const newValue = event.target.checked;
      const { __typename, ...metaFields } = user.meta;
      updateMetaForUser({
        variables: {
          id: user.id,
          meta: {
            ...metaFields,
            showDefaultGreWordSearchPromptInputs: newValue,
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

  return (
    <Box>
      {!greConfiguration?.defaultGreWordSearchPromptInputs.includes(
        user?.meta?.defaultGreWordSearchPromptInput!
      ) && (
        <FormControlLabel
          control={
            <Checkbox
              checked={!!user?.meta?.showDefaultGreWordSearchPromptInputs}
              onChange={handleChange}
            />
          }
          label="Show Predefined GreWordSearchPromptInputs"
        />
      )}
      <CreateWordSearchPromptForm
        open={createFormOpen}
        onClose={() => {
          setCreateFormOpen(false);
        }}
      />
      <EditWordSearchPromptForm
        promptInput={editedPromptInput!}
        open={!!editedPromptInput}
        onClose={() => {
          setEditedPromptInput(null);
        }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          mb: 4,
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            setCreateFormOpen(true);
          }}
          startIcon={<Add />}
        >
          Add
        </Button>
      </Box>
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
                  <IconButton
                    onClick={() => {
                      setEditedPromptInput(input);
                    }}
                  >
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
    </Box>
  );
};

export default WordSearchPrompts;
