import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Button, Typography } from '@mui/material';

import { gql, useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import environmentVars from 'lib/environmentVars';

const StyledButton = styled.button`
  color: turquoise;
`;

const DraftsDocument = gql`
  query {
    drafts {
      id
      body
      isPublished
      title
      __typename
      updatedAt
      createdAt
    }
  }
`;

interface IPracticePageProps {}
const PracticePage: React.FC<IPracticePageProps> = ({}) => {
  console.log(environmentVars);
  const { data } = useQuery(DraftsDocument);
  console.log(data);
  return (
    <div>
      <h1 className="text-red-400">this is the page changed 12345</h1>
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
