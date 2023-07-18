import { SortOrder, useGreWordsQuery } from 'gql/graphql';
import { useState } from 'react';

const itemsPerPage = 2;

interface ISampleApolloClientPaginationProps {}
const SampleApolloClientPagination: React.FC<
  ISampleApolloClientPaginationProps
> = ({}) => {
  const [currentPage, setCurrentPage] = useState({
    [SortOrder.Asc]: 1,
    [SortOrder.Desc]: 1,
  });
  const [sortOrder, setSortOrder] = useState(SortOrder.Asc);
  const greWordsQueryResult = useGreWordsQuery({
    variables: {
      where: {},
      skip: 0, // passing currentPage here is would lead to calling this hook
      // we want to prevent that and fetch and append items with fetchMore only
      take: itemsPerPage,
      orderBy: { spelling: sortOrder },
    },
  });

  const { greWords, greWordsCount } = greWordsQueryResult.data ?? {};

  const loadMore = () => {
    greWordsQueryResult.fetchMore({
      variables: {
        skip: currentPage[sortOrder] * itemsPerPage, // Increment the skip value to fetch the next page
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        console.log({ prevResult, fetchMoreResult });
        if (!fetchMoreResult) return prevResult;
        return {
          ...prevResult,
          greWords: [...prevResult.greWords, ...fetchMoreResult.greWords],
        };
      },
    });
    setCurrentPage((prev) => ({ ...prev, [sortOrder]: prev[sortOrder] + 1 }));
  };

  return (
    <div>
      <div>
        {greWords?.map((greWord, i) => (
          <div key={i}>{greWord.spelling}</div>
        ))}
      </div>
      <div>
        <button
          onClick={loadMore}
          disabled={
            currentPage[sortOrder] ===
            Math.ceil((greWordsCount ?? 0) / itemsPerPage)
          }
        >
          Load More
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            setSortOrder((prev) =>
              prev === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc
            );
          }}
        >
          Change Sort Order
        </button>
      </div>
    </div>
  );
};
export default SampleApolloClientPagination;
