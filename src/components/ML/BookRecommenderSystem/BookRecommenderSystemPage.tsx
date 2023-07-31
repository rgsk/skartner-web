import { useQuery } from '@tanstack/react-query';
import brsService from 'api/ml/brsService';
import { useMemo, useState } from 'react';

interface IBookRecommenderSystemPageProps {}
const BookRecommenderSystemPage: React.FC<
  IBookRecommenderSystemPageProps
> = ({}) => {
  const [queryInput, setQueryInput] = useState('');
  const [bookName, setBookName] = useState<string>();
  const getRecommendationsQuery = useMemo(() => {
    if (!bookName) return;
    return brsService.getRecommendations({
      book_name: bookName,
    })('default');
  }, [bookName]);

  const getRecommendationsQueryResult = useQuery({
    queryKey: getRecommendationsQuery?.key,
    queryFn: getRecommendationsQuery?.fn,
    enabled: !!getRecommendationsQuery,
  });
  const getPopularBooksQuery = useMemo(() => {
    return brsService.getPopularBooks()('default');
  }, []);
  const getPopularBooksQueryResult = useQuery({
    queryKey: getPopularBooksQuery?.key,
    queryFn: getPopularBooksQuery?.fn,
    enabled: !!getPopularBooksQuery,
  });
  const getBookNamesQuery = useMemo(() => {
    return brsService.getBookNames({ query: queryInput })('default');
  }, [queryInput]);
  const getBookNamesQueryResult = useQuery({
    queryKey: getBookNamesQuery?.key,
    queryFn: getBookNamesQuery?.fn,
    enabled: !!getBookNamesQuery,
  });
  return (
    <div className="p-5">
      <div>
        <div>
          <input
            value={queryInput}
            onChange={(e) => {
              setQueryInput(e.target.value);
            }}
          />
        </div>
        <div>
          {getBookNamesQueryResult.data?.names.map((name) => (
            <div key={name}>
              <p
                onClick={() => {
                  setBookName(name);
                }}
              >
                {name}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2>Selected: {bookName}</h2>
        <h2>Recommended Books</h2>
        <div>
          {getRecommendationsQueryResult.data?.map((book) => (
            <div key={book.book_name}>
              <p>{book.book_name}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2>Popular Books</h2>
        <div>
          {getPopularBooksQueryResult.data?.map((book) => (
            <div key={book.book_name}>
              <p
                onClick={() => {
                  setBookName(book.book_name);
                }}
              >
                {book.book_name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default BookRecommenderSystemPage;
