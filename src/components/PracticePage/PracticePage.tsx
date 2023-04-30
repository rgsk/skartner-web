import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Button, Typography } from '@mui/material';

import { useMutation, useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import {
  CreateDraftDocument,
  CreateDraftMutation,
  CreateDraftMutationVariables,
  DraftsForPracticeDocument,
  DraftsForPracticeQuery,
} from 'gql/graphql';
import { useState } from 'react';

const StyledButton = styled.button`
  color: turquoise;
`;

interface IPracticePageProps {}
const PracticePage: React.FC<IPracticePageProps> = ({}) => {
  const { data, refetch, loading } = useQuery<DraftsForPracticeQuery>(
    DraftsForPracticeDocument
  );
  const fds = data?.drafts?.[0];
  const [createDraft] = useMutation<
    CreateDraftMutation,
    CreateDraftMutationVariables
  >(CreateDraftDocument);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  return (
    <div>
      <div className="border border-red-500"></div>
      {loading ? <p>loading</p> : <p>{JSON.stringify(data?.drafts)}</p>}
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <input value={body} onChange={(e) => setBody(e.target.value)} />
      <button
        onClick={async () => {
          console.log({ title, body });
          setTitle('');
          setBody('');
          const result = await createDraft({ variables: { title, body } });
          console.log(result);
          refetch();
        }}
      >
        submit
      </button>
      <h1 className="text-red-400">
        this is the page changed 12345 again again
      </h1>
      <div className="flex">
        <Button variant="contained">hii</Button>
        <div className="ml-2">
          <Button variant="contained">hello</Button>
        </div>
      </div>
      <div>
        <AccessTimeIcon />
      </div>
      <div>






        
        <StyledButton>This my StyledButton component.</StyledButton>
      </div>
      <Typography>this is text</Typography>
      <p className="text-green-700">this is text changed now j minor 123</p>
    </div>
  );
};
export default PracticePage;
