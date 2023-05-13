import { useQuery } from '@apollo/client';
import { useGlobalContext } from 'context/GlobalContext';
import {
  GreWordSearchPromptInputsDocument,
  GreWordSearchPromptInputsQuery,
  GreWordSearchPromptInputsQueryVariables,
} from 'gql/graphql';

interface IWordSearchPromptsProps {}
const WordSearchPrompts: React.FC<IWordSearchPromptsProps> = ({}) => {
  const { user } = useGlobalContext();
  const greWordSearchPromptInputsQueryResult = useQuery<
    GreWordSearchPromptInputsQuery,
    GreWordSearchPromptInputsQueryVariables
  >(GreWordSearchPromptInputsDocument, {
    variables: {
      where: {
        userId: {
          equals: user!.id,
        },
      },
    },
    skip: !user,
  });

  return (
    <div>
      {JSON.stringify(greWordSearchPromptInputsQueryResult.data, null, 2)}
    </div>
  );
};
export default WordSearchPrompts;
