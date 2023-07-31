import { buildApiService } from 'api/apiHelper';
import { buildQuery } from 'lib/queryParamsUtils';

enum paths {
  'recommendations' = 'recommendations',
  'popular-books' = 'popular-books',
  'book-names' = 'book-names',
}

const endpoints = {
  [paths['recommendations']]: ({
    book_name,
    count,
  }: {
    book_name: string;
    count?: number;
  }) => {
    const query = buildQuery({ book_name, count });
    return {
      endpoint: `${paths['recommendations']}?${query}`,
      key: [paths['recommendations'], query],
    };
  },
  [paths['popular-books']]: () => {
    return {
      endpoint: `${paths['popular-books']}`,
      key: [paths['popular-books']],
    };
  },
  [paths['book-names']]: ({ query }: { query: string }) => {
    const queryParam = buildQuery({ query, offset: 0, limit: 5 });
    return {
      endpoint: `${paths['book-names']}?${queryParam}`,
      key: [paths['book-names'], queryParam],
    };
  },
};

const sampleResponses = {
  [paths['recommendations']]: {
    default: [
      {
        book_name: 'A Walk to Remember',
        author: 'Nicholas Sparks',
        image: 'http://images.amazon.com/images/P/0446608955.01.MZZZZZZZ.jpg',
      },
    ],
  },
  [paths['popular-books']]: {
    default: [
      {
        book_name: 'Harry Potter and the Prisoner of Azkaban (Book 3)',
        author: 'J. K. Rowling',
        image: 'http://images.amazon.com/images/P/0439136350.01.MZZZZZZZ.jpg',
        votes: 428,
        rating: 5.852803738317757,
      },
    ],
  },
  [paths['book-names']]: {
    default: {
      total: 271360,
      names: ['Classical Mythology', 'Clara Callan', 'Decision in Normandy'],
    },
  },
};

const baseUrl = 'http://localhost:8000';

const apiBuilder = buildApiService({
  paths,
  endpoints,
  sampleResponses,
  baseUrl,
});

const brsService = {
  getRecommendations: apiBuilder.getRequest(paths['recommendations']),
  getPopularBooks: apiBuilder.getRequest(paths['popular-books']),
  getBookNames: apiBuilder.getRequest(paths['book-names']),
};
export default brsService;
