import { gql } from '@apollo/client';
import { Autocomplete, TextField, Typography } from '@mui/material';
import { noneTag } from 'components/GrePage/GrePage';
import { useGlobalContext } from 'context/GlobalContext';
import { useCreateGreWordTagMutation, useGreWordTagsQuery } from 'gql/graphql';
import { Dispatch, SetStateAction, useState } from 'react';

interface ITagInputProps {
  selectedTag: string | null;
  setSelectedTag: Dispatch<SetStateAction<string | null>>;
}
const TagInput: React.FC<ITagInputProps> = ({
  selectedTag,
  setSelectedTag,
}) => {
  const { user } = useGlobalContext();

  const [createGreWordTag] = useCreateGreWordTagMutation();
  const greWordTagsQueryResult = useGreWordTagsQuery({
    variables: {
      where: {
        userId: {
          equals: user!.id,
        },
      },
    },
  });

  const [tagSearchInput, setTagSearchInput] = useState('');

  const tagNames = [
    noneTag,
    ...(greWordTagsQueryResult.data?.greWordTags.map((tag) => tag.name) ?? []),
  ];

  const filteredOptions =
    tagNames?.filter((tagName) =>
      tagName.toLowerCase().includes(tagSearchInput.toLowerCase())
    ) ?? [];

  return (
    <Autocomplete
      value={selectedTag}
      options={filteredOptions}
      onChange={(event, value) => {
        setSelectedTag(value);
      }}
      onInputChange={(event, value) => {
        setTagSearchInput(value);
      }}
      renderInput={(params) => {
        return <TextField {...params} label="Tag" variant="outlined" />;
      }}
      renderOption={(props, option) => {
        return (
          <Typography
            sx={{
              fontStyle: option === noneTag ? 'italic' : 'normal',
            }}
            {...props}
          >
            {option}
          </Typography>
        );
      }}
      clearOnBlur
      clearOnEscape
      autoHighlight
      selectOnFocus
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          if (tagSearchInput) {
            if (
              tagSearchInput === noneTag ||
              tagNames.includes(tagSearchInput)
            ) {
              setSelectedTag(tagSearchInput);
            } else {
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
  );
};
export default TagInput;
