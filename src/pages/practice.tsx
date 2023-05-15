import PracticePage from 'components/PracticePage/PracticePage';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

export async function getStaticProps({}: GetStaticPropsContext) {
  return {
    props: {},
    revalidate: 10,
  };
}

const Page = ({}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <PracticePage />
    </div>
  );
};
export default Page;
// comment modified
