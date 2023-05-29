import { gql } from '@apollo/client';
import { Delete } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Chip,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { useGlobalContext } from 'context/GlobalContext';
import {
  useCreateGreWordTagMutation,
  useDeleteGreWordTagMutation,
  useGreWordTagsQuery,
} from 'gql/graphql';
import useRunOnWindowFocus from 'hooks/utils/useRunOnWindowFocus';
import { useState } from 'react';

interface ITagInputProps {
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
}
const TagInput: React.FC<ITagInputProps> = ({
  selectedTags,
  setSelectedTags,
}) => {
  const { user } = useGlobalContext();
  const [createGreWordTag] = useCreateGreWordTagMutation();
  const [deleteGreWordTag] = useDeleteGreWordTagMutation();

  const greWordTagsQueryResult = useGreWordTagsQuery({
    variables: {
      where: {
        userId: {
          equals: user!.id,
        },
      },
    },
  });
  useRunOnWindowFocus(greWordTagsQueryResult.refetch);

  const [tagSearchInput, setTagSearchInput] = useState('');

  const tagNames = [
    ...(greWordTagsQueryResult.data?.greWordTags.map((tag) => tag.name) ?? []),
  ];
  const handleDeleteTag = (tag: string) => {
    const updatedTags = selectedTags.filter((t) => t !== tag);
    setSelectedTags(updatedTags);
  };

  const filteredOptions =
    tagNames?.filter((tagName) =>
      tagName.toLowerCase().includes(tagSearchInput.toLowerCase())
    ) ?? [];

  return (
    <Box>
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          gap: 1,
        }}
      >
        {selectedTags.map((tag) => (
          <Chip key={tag} label={tag} onDelete={() => handleDeleteTag(tag)} />
        ))}
      </Box>
      <Autocomplete
        fullWidth
        sx={{ minWidth: '300px' }}
        options={filteredOptions}
        value=""
        onChange={(event, value) => {
          if (value) {
            if (!selectedTags.includes(value)) {
              setSelectedTags([...selectedTags, value]);
            }
          }
        }}
        onInputChange={(event, value) => {
          setTagSearchInput(value);
        }}
        renderInput={(params) => {
          return <TextField {...params} label="Tag" variant="outlined" />;
        }}
        renderOption={(props, tagName) => {
          return (
            <Box
              key={tagName}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Typography
                sx={{
                  flex: 1,
                }}
                {...props}
              >
                {tagName}
              </Typography>
              <IconButton
                onClick={() => {
                  deleteGreWordTag({
                    variables: {
                      name: tagName,
                    },
                    update: (cache, { data }) => {
                      if (data?.deleteGreWordTag) {
                        cache.modify({
                          fields: {
                            greWordTags(existingTags = [], { readField }) {
                              return existingTags.filter(
                                (tagRef: any) =>
                                  tagName !== readField('name', tagRef)
                              );
                            },
                          },
                        });
                      }
                    },
                  });
                }}
              >
                <Delete />
              </IconButton>
            </Box>
          );
        }}
        clearOnBlur
        clearOnEscape
        autoHighlight
        selectOnFocus
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            if (tagSearchInput) {
              if (!tagNames.includes(tagSearchInput)) {
                createGreWordTag({
                  variables: {
                    name: tagSearchInput,
                    userId: user!.id,
                  },
                  update: (cache, { data }) => {
                    cache.modify({
                      fields: {
                        greWordTags(existingTags = []) {
                          const newTagRef = cache.writeFragment({
                            data: data?.createGreWordTag,
                            fragment: gql`
                              fragment NewTag on GreWordTag {
                                id
                                name
                              }
                            `,
                          });

                          return [...existingTags, newTagRef];
                        },
                      },
                    });
                  },
                });
              }
            }
          }
        }}
      />
    </Box>
  );
};
export default TagInput;
