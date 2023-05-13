import { useGlobalContext } from 'context/GlobalContext';
import { useGreWordSearchPromptInputsQuery } from 'gql/graphql';

interface IWordSearchPromptsProps {}
const WordSearchPrompts: React.FC<IWordSearchPromptsProps> = ({}) => {
  const { user } = useGlobalContext();
  useGreWordSearchPromptInputsQuery;
  const greWordSearchPromptInputsQueryResult =
    useGreWordSearchPromptInputsQuery({
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
