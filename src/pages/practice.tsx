import PracticePage from 'components/PracticePage/PracticePage';
import { DraftsForPracticeDocument, DraftsForPracticeQuery } from 'gql/graphql';
import apolloClient from 'lib/apolloClient';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

export async function getStaticProps({}: GetStaticPropsContext) {
  const { data } = await apolloClient.query<DraftsForPracticeQuery>({
    query: DraftsForPracticeDocument,
    fetchPolicy: 'no-cache',
  });
  console.log(data);
  return {
    props: {
      drafts: data,
    },
    revalidate: 10,
  };
}
//

const Page = ({ drafts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      {drafts && <div>{JSON.stringify(drafts)}</div>}
      <PracticePage />
    </div>
  );
};
export default Page;
