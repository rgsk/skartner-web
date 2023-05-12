import { useQuery } from '@apollo/client';
import { Box } from '@mui/material';
import {
  GreWordsDocument,
  GreWordsQuery,
  GreWordsQueryVariables,
} from 'gql/graphql';
import useQueryTracker from 'hooks/useQueryTracker';
import { ValueToDeleteQueryKey } from 'lib/queryParamsUtils';
import { useMemo, useState } from 'react';

enum QueryParams {
  page = 'page',
  query = 'query',
}

const itemsPerPage = 10;

interface IGreHistoryPageProps {}
const GreHistoryPage: React.FC<IGreHistoryPageProps> = ({}) => {
  const [queryInput, setQueryInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const greWordsQueryResult = useQuery<GreWordsQuery, GreWordsQueryVariables>(
    GreWordsDocument,
    {
      variables: {
        where: { spelling: { startsWith: queryInput } },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
      },
    }
  );

  const queryTrackerInput = useMemo(() => {
    const result: any = {};
    result[QueryParams.page] = currentPage;
    if (queryInput) {
      result[QueryParams.query] = queryInput;
    } else {
      result[QueryParams.query] = ValueToDeleteQueryKey;
    }
    return result;
  }, [currentPage, queryInput]);

  useQueryTracker(queryTrackerInput, ({ params, onParamsAssignedToState }) => {
    const { [QueryParams.page]: pageParam, [QueryParams.query]: queryParam } =
      params;
    if (pageParam) {
      setCurrentPage(+pageParam);
    }
    if (queryParam) {
      setQueryInput(queryParam as string);
    }
    onParamsAssignedToState();
  });

  return (
    <div>
      <div>
        <input
          type="text"
          value={queryInput}
          onChange={(e) => {
            setQueryInput(e.target.value);
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
