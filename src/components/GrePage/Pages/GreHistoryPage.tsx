import { useQuery } from '@apollo/client';
import { Box } from '@mui/material';
import {
  GreWordsDocument,
  GreWordsQuery,
  GreWordsQueryVariables,
} from 'gql/graphql';
import { useState } from 'react';

interface IGreHistoryPageProps {}
const GreHistoryPage: React.FC<IGreHistoryPageProps> = ({}) => {
  const [filterInput, setFilterInput] = useState('');
  const greWordsQueryResult = useQuery<GreWordsQuery, GreWordsQueryVariables>(
    GreWordsDocument,
    {
      variables: {
        where: { spelling: { startsWith: filterInput } },
      },
    }
  );

  return (
    <div>
      <div>
        <input
          type="text"
          value={filterInput}
          onChange={(e) => {
            setFilterInput(e.target.value);
          }}
        />
      </div>
      {greWordsQueryResult.data?.greWords.map((greWord) => {
        return (
          <Box key={greWord.id} sx={{ borderTop: '2px solid red', mt: 2 }}>
            <p>Spelling: {greWord.spelling}</p>
            <div>
              <p>Gre Prompts</p>
              {greWord.gptPrompts.map((gptPrompt) => {
                return (
                  <div key={gptPrompt.id}>
                    <p>Input: {gptPrompt.input}</p>
                    <p>Response: {gptPrompt.response}</p>
                  </div>
                );
              })}
            </div>
          </Box>
        );
      })}
    </div>
  );
};
export default GreHistoryPage;
