import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Json: any;
};

export type GptPrompt = {
  __typename?: 'GptPrompt';
  createdAt: Scalars['String'];
  greWord?: Maybe<GreWord>;
  greWordId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  input: Scalars['String'];
  response: Scalars['String'];
  updatedAt: Scalars['String'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
};

export type GreConfiguration = {
  __typename?: 'GreConfiguration';
  defaultGreWordSearchPromptInputs: Array<Scalars['String']>;
};

export type GreWord = {
  __typename?: 'GreWord';
  createdAt: Scalars['String'];
  gptPrompts: Array<GptPrompt>;
  id: Scalars['String'];
  spelling: Scalars['String'];
  updatedAt: Scalars['String'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
};

export type GreWordSearchPromptInput = {
  __typename?: 'GreWordSearchPromptInput';
  createdAt: Scalars['String'];
  id: Scalars['String'];
  text: Scalars['String'];
  updatedAt: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export type GreWordSearchPromptInputWhereInput = {
  id?: InputMaybe<StringFilter>;
  text?: InputMaybe<StringFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type GreWordWhereInput = {
  id?: InputMaybe<StringFilter>;
  spelling?: InputMaybe<StringFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type MetaFields = {
  __typename?: 'MetaFields';
  user: MetaFields_User;
};

export type MetaFields_User = {
  __typename?: 'MetaFields_User';
  showDefaultGreWordSearchPromptInputs: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createDraft?: Maybe<Post>;
  createGreWord: GreWord;
  createGreWordSearchPromptInput: GreWordSearchPromptInput;
  createUser?: Maybe<User>;
  deleteGptPrompt?: Maybe<GptPrompt>;
  deleteGreWord?: Maybe<GreWord>;
  deleteGreWordSearchPromptInput?: Maybe<GreWordSearchPromptInput>;
  publish?: Maybe<Post>;
  updateGreWordSearchPromptInput?: Maybe<GreWordSearchPromptInput>;
  updateUser?: Maybe<User>;
};


export type MutationCreateDraftArgs = {
  body: Scalars['String'];
  title: Scalars['String'];
};


export type MutationCreateGreWordArgs = {
  promptInput: Scalars['String'];
  promptResponse: Scalars['String'];
  spelling: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationCreateGreWordSearchPromptInputArgs = {
  text: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  meta?: InputMaybe<Scalars['Json']>;
};


export type MutationDeleteGptPromptArgs = {
  id: Scalars['String'];
};


export type MutationDeleteGreWordArgs = {
  id: Scalars['String'];
};


export type MutationDeleteGreWordSearchPromptInputArgs = {
  id: Scalars['String'];
};


export type MutationPublishArgs = {
  draftId: Scalars['String'];
};


export type MutationUpdateGreWordSearchPromptInputArgs = {
  id: Scalars['String'];
  text: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  meta?: InputMaybe<Scalars['Json']>;
};

export type Post = {
  __typename?: 'Post';
  body?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  id: Scalars['String'];
  isPublished?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allPosts?: Maybe<Array<Maybe<Post>>>;
  drafts?: Maybe<Array<Maybe<Post>>>;
  gptPrompts?: Maybe<Array<Maybe<GptPrompt>>>;
  greConfiguration: GreConfiguration;
  greWordSearchPromptInputs: Array<GreWordSearchPromptInput>;
  greWords: Array<GreWord>;
  greWordsCount: Scalars['Int'];
  metaFields: MetaFields;
  posts?: Maybe<Array<Maybe<Post>>>;
  sendSinglePrompt?: Maybe<Scalars['String']>;
  users: Array<User>;
};


export type QueryAllPostsArgs = {
  isPublished: Scalars['Boolean'];
  token?: InputMaybe<Scalars['String']>;
};


export type QueryGptPromptsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryGreWordSearchPromptInputsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GreWordSearchPromptInputWhereInput>;
};


export type QueryGreWordsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GreWordWhereInput>;
};


export type QueryGreWordsCountArgs = {
  where?: InputMaybe<GreWordWhereInput>;
};


export type QuerySendSinglePromptArgs = {
  input: Scalars['String'];
};


export type QueryUsersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<Scalars['String']>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  gptPrompts: Array<GptPrompt>;
  greWordSearchPromptInputs: Array<GreWordSearchPromptInput>;
  greWords: Array<GreWord>;
  id: Scalars['String'];
  meta?: Maybe<Scalars['Json']>;
  updatedAt: Scalars['String'];
};

export type UserWhereInput = {
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
};

export type GreWordSearchPromptInputsQueryVariables = Exact<{
  where?: InputMaybe<GreWordSearchPromptInputWhereInput>;
}>;


export type GreWordSearchPromptInputsQuery = { __typename?: 'Query', greWordSearchPromptInputs: Array<{ __typename?: 'GreWordSearchPromptInput', id: string, text: string, userId: string }> };

export type CreateGreWordSearchPromptInputMutationVariables = Exact<{
  text: Scalars['String'];
  userId: Scalars['String'];
}>;


export type CreateGreWordSearchPromptInputMutation = { __typename?: 'Mutation', createGreWordSearchPromptInput: { __typename?: 'GreWordSearchPromptInput', id: string, text: string, userId: string } };

export type UpdateGreWordSearchPromptInputMutationVariables = Exact<{
  text: Scalars['String'];
  id: Scalars['String'];
}>;


export type UpdateGreWordSearchPromptInputMutation = { __typename?: 'Mutation', updateGreWordSearchPromptInput?: { __typename?: 'GreWordSearchPromptInput', id: string, text: string, userId: string } | null };

export type DeleteGreWordSearchPromptInputMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteGreWordSearchPromptInputMutation = { __typename?: 'Mutation', deleteGreWordSearchPromptInput?: { __typename?: 'GreWordSearchPromptInput', id: string } | null };

export type UpdateMetaForUserMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  meta?: InputMaybe<Scalars['Json']>;
}>;


export type UpdateMetaForUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'User', id: string, email: string, meta?: any | null } | null };

export type SendSinglePromptQueryVariables = Exact<{
  input: Scalars['String'];
}>;


export type SendSinglePromptQuery = { __typename?: 'Query', sendSinglePrompt?: string | null };

export type CreateGreWordMutationVariables = Exact<{
  spelling: Scalars['String'];
  promptInput: Scalars['String'];
  promptResponse: Scalars['String'];
  userId: Scalars['String'];
}>;


export type CreateGreWordMutation = { __typename?: 'Mutation', createGreWord: { __typename?: 'GreWord', id: string, spelling: string, gptPrompts: Array<{ __typename?: 'GptPrompt', id: string, input: string, response: string }> } };

export type GreConfigurationQueryVariables = Exact<{ [key: string]: never; }>;


export type GreConfigurationQuery = { __typename?: 'Query', greConfiguration: { __typename?: 'GreConfiguration', defaultGreWordSearchPromptInputs: Array<string> } };

export type GreWordsQueryVariables = Exact<{
  where?: InputMaybe<GreWordWhereInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
}>;


export type GreWordsQuery = { __typename?: 'Query', greWordsCount: number, greWords: Array<{ __typename?: 'GreWord', id: string, spelling: string, gptPrompts: Array<{ __typename?: 'GptPrompt', id: string, input: string, response: string, greWordId?: string | null }> }> };

export type DeleteGreWordMutationVariables = Exact<{
  deleteGreWordId: Scalars['String'];
}>;


export type DeleteGreWordMutation = { __typename?: 'Mutation', deleteGreWord?: { __typename?: 'GreWord', id: string } | null };

export type DeleteGptPromptMutationVariables = Exact<{
  deleteGptPromptId: Scalars['String'];
}>;


export type DeleteGptPromptMutation = { __typename?: 'Mutation', deleteGptPrompt?: { __typename?: 'GptPrompt', id: string } | null };

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'User', id: string, email: string, meta?: any | null } | null };

export type UsersForLoginPageQueryVariables = Exact<{
  where?: InputMaybe<UserWhereInput>;
}>;


export type UsersForLoginPageQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, email: string, meta?: any | null }> };

export type DraftsForPracticeQueryVariables = Exact<{ [key: string]: never; }>;


export type DraftsForPracticeQuery = { __typename?: 'Query', drafts?: Array<{ __typename?: 'Post', id: string, title?: string | null, body?: string | null, createdAt: string } | null> | null };

export type CreateDraftMutationVariables = Exact<{
  title: Scalars['String'];
  body: Scalars['String'];
}>;


export type CreateDraftMutation = { __typename?: 'Mutation', createDraft?: { __typename?: 'Post', id: string, title?: string | null, body?: string | null } | null };

export type MetaFieldsQueryVariables = Exact<{ [key: string]: never; }>;


export type MetaFieldsQuery = { __typename?: 'Query', metaFields: { __typename?: 'MetaFields', user: { __typename?: 'MetaFields_User', showDefaultGreWordSearchPromptInputs: string } } };


export const GreWordSearchPromptInputsDocument = gql`
    query greWordSearchPromptInputs($where: GreWordSearchPromptInputWhereInput) {
  greWordSearchPromptInputs(where: $where) {
    id
    text
    userId
  }
}
    `;

/**
 * __useGreWordSearchPromptInputsQuery__
 *
 * To run a query within a React component, call `useGreWordSearchPromptInputsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGreWordSearchPromptInputsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGreWordSearchPromptInputsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGreWordSearchPromptInputsQuery(baseOptions?: Apollo.QueryHookOptions<GreWordSearchPromptInputsQuery, GreWordSearchPromptInputsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GreWordSearchPromptInputsQuery, GreWordSearchPromptInputsQueryVariables>(GreWordSearchPromptInputsDocument, options);
      }
export function useGreWordSearchPromptInputsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GreWordSearchPromptInputsQuery, GreWordSearchPromptInputsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GreWordSearchPromptInputsQuery, GreWordSearchPromptInputsQueryVariables>(GreWordSearchPromptInputsDocument, options);
        }
export type GreWordSearchPromptInputsQueryHookResult = ReturnType<typeof useGreWordSearchPromptInputsQuery>;
export type GreWordSearchPromptInputsLazyQueryHookResult = ReturnType<typeof useGreWordSearchPromptInputsLazyQuery>;
export type GreWordSearchPromptInputsQueryResult = Apollo.QueryResult<GreWordSearchPromptInputsQuery, GreWordSearchPromptInputsQueryVariables>;
export const CreateGreWordSearchPromptInputDocument = gql`
    mutation createGreWordSearchPromptInput($text: String!, $userId: String!) {
  createGreWordSearchPromptInput(text: $text, userId: $userId) {
    id
    text
    userId
  }
}
    `;
export type CreateGreWordSearchPromptInputMutationFn = Apollo.MutationFunction<CreateGreWordSearchPromptInputMutation, CreateGreWordSearchPromptInputMutationVariables>;

/**
 * __useCreateGreWordSearchPromptInputMutation__
 *
 * To run a mutation, you first call `useCreateGreWordSearchPromptInputMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGreWordSearchPromptInputMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGreWordSearchPromptInputMutation, { data, loading, error }] = useCreateGreWordSearchPromptInputMutation({
 *   variables: {
 *      text: // value for 'text'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useCreateGreWordSearchPromptInputMutation(baseOptions?: Apollo.MutationHookOptions<CreateGreWordSearchPromptInputMutation, CreateGreWordSearchPromptInputMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGreWordSearchPromptInputMutation, CreateGreWordSearchPromptInputMutationVariables>(CreateGreWordSearchPromptInputDocument, options);
      }
export type CreateGreWordSearchPromptInputMutationHookResult = ReturnType<typeof useCreateGreWordSearchPromptInputMutation>;
export type CreateGreWordSearchPromptInputMutationResult = Apollo.MutationResult<CreateGreWordSearchPromptInputMutation>;
export type CreateGreWordSearchPromptInputMutationOptions = Apollo.BaseMutationOptions<CreateGreWordSearchPromptInputMutation, CreateGreWordSearchPromptInputMutationVariables>;
export const UpdateGreWordSearchPromptInputDocument = gql`
    mutation updateGreWordSearchPromptInput($text: String!, $id: String!) {
  updateGreWordSearchPromptInput(text: $text, id: $id) {
    id
    text
    userId
  }
}
    `;
export type UpdateGreWordSearchPromptInputMutationFn = Apollo.MutationFunction<UpdateGreWordSearchPromptInputMutation, UpdateGreWordSearchPromptInputMutationVariables>;

/**
 * __useUpdateGreWordSearchPromptInputMutation__
 *
 * To run a mutation, you first call `useUpdateGreWordSearchPromptInputMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGreWordSearchPromptInputMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGreWordSearchPromptInputMutation, { data, loading, error }] = useUpdateGreWordSearchPromptInputMutation({
 *   variables: {
 *      text: // value for 'text'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateGreWordSearchPromptInputMutation(baseOptions?: Apollo.MutationHookOptions<UpdateGreWordSearchPromptInputMutation, UpdateGreWordSearchPromptInputMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateGreWordSearchPromptInputMutation, UpdateGreWordSearchPromptInputMutationVariables>(UpdateGreWordSearchPromptInputDocument, options);
      }
export type UpdateGreWordSearchPromptInputMutationHookResult = ReturnType<typeof useUpdateGreWordSearchPromptInputMutation>;
export type UpdateGreWordSearchPromptInputMutationResult = Apollo.MutationResult<UpdateGreWordSearchPromptInputMutation>;
export type UpdateGreWordSearchPromptInputMutationOptions = Apollo.BaseMutationOptions<UpdateGreWordSearchPromptInputMutation, UpdateGreWordSearchPromptInputMutationVariables>;
export const DeleteGreWordSearchPromptInputDocument = gql`
    mutation deleteGreWordSearchPromptInput($id: String!) {
  deleteGreWordSearchPromptInput(id: $id) {
    id
  }
}
    `;
export type DeleteGreWordSearchPromptInputMutationFn = Apollo.MutationFunction<DeleteGreWordSearchPromptInputMutation, DeleteGreWordSearchPromptInputMutationVariables>;

/**
 * __useDeleteGreWordSearchPromptInputMutation__
 *
 * To run a mutation, you first call `useDeleteGreWordSearchPromptInputMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGreWordSearchPromptInputMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGreWordSearchPromptInputMutation, { data, loading, error }] = useDeleteGreWordSearchPromptInputMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteGreWordSearchPromptInputMutation(baseOptions?: Apollo.MutationHookOptions<DeleteGreWordSearchPromptInputMutation, DeleteGreWordSearchPromptInputMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteGreWordSearchPromptInputMutation, DeleteGreWordSearchPromptInputMutationVariables>(DeleteGreWordSearchPromptInputDocument, options);
      }
export type DeleteGreWordSearchPromptInputMutationHookResult = ReturnType<typeof useDeleteGreWordSearchPromptInputMutation>;
export type DeleteGreWordSearchPromptInputMutationResult = Apollo.MutationResult<DeleteGreWordSearchPromptInputMutation>;
export type DeleteGreWordSearchPromptInputMutationOptions = Apollo.BaseMutationOptions<DeleteGreWordSearchPromptInputMutation, DeleteGreWordSearchPromptInputMutationVariables>;
export const UpdateMetaForUserDocument = gql`
    mutation updateMetaForUser($id: String, $email: String, $meta: Json) {
  updateUser(id: $id, email: $email, meta: $meta) {
    id
    email
    meta
  }
}
    `;
export type UpdateMetaForUserMutationFn = Apollo.MutationFunction<UpdateMetaForUserMutation, UpdateMetaForUserMutationVariables>;

/**
 * __useUpdateMetaForUserMutation__
 *
 * To run a mutation, you first call `useUpdateMetaForUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMetaForUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMetaForUserMutation, { data, loading, error }] = useUpdateMetaForUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      email: // value for 'email'
 *      meta: // value for 'meta'
 *   },
 * });
 */
export function useUpdateMetaForUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMetaForUserMutation, UpdateMetaForUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMetaForUserMutation, UpdateMetaForUserMutationVariables>(UpdateMetaForUserDocument, options);
      }
export type UpdateMetaForUserMutationHookResult = ReturnType<typeof useUpdateMetaForUserMutation>;
export type UpdateMetaForUserMutationResult = Apollo.MutationResult<UpdateMetaForUserMutation>;
export type UpdateMetaForUserMutationOptions = Apollo.BaseMutationOptions<UpdateMetaForUserMutation, UpdateMetaForUserMutationVariables>;
export const SendSinglePromptDocument = gql`
    query sendSinglePrompt($input: String!) {
  sendSinglePrompt(input: $input)
}
    `;

/**
 * __useSendSinglePromptQuery__
 *
 * To run a query within a React component, call `useSendSinglePromptQuery` and pass it any options that fit your needs.
 * When your component renders, `useSendSinglePromptQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSendSinglePromptQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendSinglePromptQuery(baseOptions: Apollo.QueryHookOptions<SendSinglePromptQuery, SendSinglePromptQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SendSinglePromptQuery, SendSinglePromptQueryVariables>(SendSinglePromptDocument, options);
      }
export function useSendSinglePromptLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SendSinglePromptQuery, SendSinglePromptQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SendSinglePromptQuery, SendSinglePromptQueryVariables>(SendSinglePromptDocument, options);
        }
export type SendSinglePromptQueryHookResult = ReturnType<typeof useSendSinglePromptQuery>;
export type SendSinglePromptLazyQueryHookResult = ReturnType<typeof useSendSinglePromptLazyQuery>;
export type SendSinglePromptQueryResult = Apollo.QueryResult<SendSinglePromptQuery, SendSinglePromptQueryVariables>;
export const CreateGreWordDocument = gql`
    mutation createGreWord($spelling: String!, $promptInput: String!, $promptResponse: String!, $userId: String!) {
  createGreWord(
    spelling: $spelling
    promptInput: $promptInput
    promptResponse: $promptResponse
    userId: $userId
  ) {
    id
    spelling
    gptPrompts {
      id
      input
      response
    }
  }
}
    `;
export type CreateGreWordMutationFn = Apollo.MutationFunction<CreateGreWordMutation, CreateGreWordMutationVariables>;

/**
 * __useCreateGreWordMutation__
 *
 * To run a mutation, you first call `useCreateGreWordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGreWordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGreWordMutation, { data, loading, error }] = useCreateGreWordMutation({
 *   variables: {
 *      spelling: // value for 'spelling'
 *      promptInput: // value for 'promptInput'
 *      promptResponse: // value for 'promptResponse'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useCreateGreWordMutation(baseOptions?: Apollo.MutationHookOptions<CreateGreWordMutation, CreateGreWordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGreWordMutation, CreateGreWordMutationVariables>(CreateGreWordDocument, options);
      }
export type CreateGreWordMutationHookResult = ReturnType<typeof useCreateGreWordMutation>;
export type CreateGreWordMutationResult = Apollo.MutationResult<CreateGreWordMutation>;
export type CreateGreWordMutationOptions = Apollo.BaseMutationOptions<CreateGreWordMutation, CreateGreWordMutationVariables>;
export const GreConfigurationDocument = gql`
    query GreConfiguration {
  greConfiguration {
    defaultGreWordSearchPromptInputs
  }
}
    `;

/**
 * __useGreConfigurationQuery__
 *
 * To run a query within a React component, call `useGreConfigurationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGreConfigurationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGreConfigurationQuery({
 *   variables: {
 *   },
 * });
 */
export function useGreConfigurationQuery(baseOptions?: Apollo.QueryHookOptions<GreConfigurationQuery, GreConfigurationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GreConfigurationQuery, GreConfigurationQueryVariables>(GreConfigurationDocument, options);
      }
export function useGreConfigurationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GreConfigurationQuery, GreConfigurationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GreConfigurationQuery, GreConfigurationQueryVariables>(GreConfigurationDocument, options);
        }
export type GreConfigurationQueryHookResult = ReturnType<typeof useGreConfigurationQuery>;
export type GreConfigurationLazyQueryHookResult = ReturnType<typeof useGreConfigurationLazyQuery>;
export type GreConfigurationQueryResult = Apollo.QueryResult<GreConfigurationQuery, GreConfigurationQueryVariables>;
export const GreWordsDocument = gql`
    query greWords($where: GreWordWhereInput, $skip: Int, $take: Int) {
  greWords(where: $where, skip: $skip, take: $take) {
    id
    spelling
    gptPrompts {
      id
      input
      response
      greWordId
    }
  }
  greWordsCount(where: $where)
}
    `;

/**
 * __useGreWordsQuery__
 *
 * To run a query within a React component, call `useGreWordsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGreWordsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGreWordsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useGreWordsQuery(baseOptions?: Apollo.QueryHookOptions<GreWordsQuery, GreWordsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GreWordsQuery, GreWordsQueryVariables>(GreWordsDocument, options);
      }
export function useGreWordsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GreWordsQuery, GreWordsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GreWordsQuery, GreWordsQueryVariables>(GreWordsDocument, options);
        }
export type GreWordsQueryHookResult = ReturnType<typeof useGreWordsQuery>;
export type GreWordsLazyQueryHookResult = ReturnType<typeof useGreWordsLazyQuery>;
export type GreWordsQueryResult = Apollo.QueryResult<GreWordsQuery, GreWordsQueryVariables>;
export const DeleteGreWordDocument = gql`
    mutation DeleteGreWord($deleteGreWordId: String!) {
  deleteGreWord(id: $deleteGreWordId) {
    id
  }
}
    `;
export type DeleteGreWordMutationFn = Apollo.MutationFunction<DeleteGreWordMutation, DeleteGreWordMutationVariables>;

/**
 * __useDeleteGreWordMutation__
 *
 * To run a mutation, you first call `useDeleteGreWordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGreWordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGreWordMutation, { data, loading, error }] = useDeleteGreWordMutation({
 *   variables: {
 *      deleteGreWordId: // value for 'deleteGreWordId'
 *   },
 * });
 */
export function useDeleteGreWordMutation(baseOptions?: Apollo.MutationHookOptions<DeleteGreWordMutation, DeleteGreWordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteGreWordMutation, DeleteGreWordMutationVariables>(DeleteGreWordDocument, options);
      }
export type DeleteGreWordMutationHookResult = ReturnType<typeof useDeleteGreWordMutation>;
export type DeleteGreWordMutationResult = Apollo.MutationResult<DeleteGreWordMutation>;
export type DeleteGreWordMutationOptions = Apollo.BaseMutationOptions<DeleteGreWordMutation, DeleteGreWordMutationVariables>;
export const DeleteGptPromptDocument = gql`
    mutation DeleteGptPrompt($deleteGptPromptId: String!) {
  deleteGptPrompt(id: $deleteGptPromptId) {
    id
  }
}
    `;
export type DeleteGptPromptMutationFn = Apollo.MutationFunction<DeleteGptPromptMutation, DeleteGptPromptMutationVariables>;

/**
 * __useDeleteGptPromptMutation__
 *
 * To run a mutation, you first call `useDeleteGptPromptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGptPromptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGptPromptMutation, { data, loading, error }] = useDeleteGptPromptMutation({
 *   variables: {
 *      deleteGptPromptId: // value for 'deleteGptPromptId'
 *   },
 * });
 */
export function useDeleteGptPromptMutation(baseOptions?: Apollo.MutationHookOptions<DeleteGptPromptMutation, DeleteGptPromptMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteGptPromptMutation, DeleteGptPromptMutationVariables>(DeleteGptPromptDocument, options);
      }
export type DeleteGptPromptMutationHookResult = ReturnType<typeof useDeleteGptPromptMutation>;
export type DeleteGptPromptMutationResult = Apollo.MutationResult<DeleteGptPromptMutation>;
export type DeleteGptPromptMutationOptions = Apollo.BaseMutationOptions<DeleteGptPromptMutation, DeleteGptPromptMutationVariables>;
export const CreateUserDocument = gql`
    mutation createUser($email: String!) {
  createUser(email: $email) {
    id
    email
    meta
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const UsersForLoginPageDocument = gql`
    query usersForLoginPage($where: UserWhereInput) {
  users(where: $where) {
    id
    email
    meta
  }
}
    `;

/**
 * __useUsersForLoginPageQuery__
 *
 * To run a query within a React component, call `useUsersForLoginPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersForLoginPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersForLoginPageQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUsersForLoginPageQuery(baseOptions?: Apollo.QueryHookOptions<UsersForLoginPageQuery, UsersForLoginPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersForLoginPageQuery, UsersForLoginPageQueryVariables>(UsersForLoginPageDocument, options);
      }
export function useUsersForLoginPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersForLoginPageQuery, UsersForLoginPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersForLoginPageQuery, UsersForLoginPageQueryVariables>(UsersForLoginPageDocument, options);
        }
export type UsersForLoginPageQueryHookResult = ReturnType<typeof useUsersForLoginPageQuery>;
export type UsersForLoginPageLazyQueryHookResult = ReturnType<typeof useUsersForLoginPageLazyQuery>;
export type UsersForLoginPageQueryResult = Apollo.QueryResult<UsersForLoginPageQuery, UsersForLoginPageQueryVariables>;
export const DraftsForPracticeDocument = gql`
    query draftsForPractice {
  drafts {
    id
    title
    body
    createdAt
  }
}
    `;

/**
 * __useDraftsForPracticeQuery__
 *
 * To run a query within a React component, call `useDraftsForPracticeQuery` and pass it any options that fit your needs.
 * When your component renders, `useDraftsForPracticeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDraftsForPracticeQuery({
 *   variables: {
 *   },
 * });
 */
export function useDraftsForPracticeQuery(baseOptions?: Apollo.QueryHookOptions<DraftsForPracticeQuery, DraftsForPracticeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DraftsForPracticeQuery, DraftsForPracticeQueryVariables>(DraftsForPracticeDocument, options);
      }
export function useDraftsForPracticeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DraftsForPracticeQuery, DraftsForPracticeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DraftsForPracticeQuery, DraftsForPracticeQueryVariables>(DraftsForPracticeDocument, options);
        }
export type DraftsForPracticeQueryHookResult = ReturnType<typeof useDraftsForPracticeQuery>;
export type DraftsForPracticeLazyQueryHookResult = ReturnType<typeof useDraftsForPracticeLazyQuery>;
export type DraftsForPracticeQueryResult = Apollo.QueryResult<DraftsForPracticeQuery, DraftsForPracticeQueryVariables>;
export const CreateDraftDocument = gql`
    mutation createDraft($title: String!, $body: String!) {
  createDraft(title: $title, body: $body) {
    id
    title
    body
  }
}
    `;
export type CreateDraftMutationFn = Apollo.MutationFunction<CreateDraftMutation, CreateDraftMutationVariables>;

/**
 * __useCreateDraftMutation__
 *
 * To run a mutation, you first call `useCreateDraftMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDraftMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDraftMutation, { data, loading, error }] = useCreateDraftMutation({
 *   variables: {
 *      title: // value for 'title'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useCreateDraftMutation(baseOptions?: Apollo.MutationHookOptions<CreateDraftMutation, CreateDraftMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDraftMutation, CreateDraftMutationVariables>(CreateDraftDocument, options);
      }
export type CreateDraftMutationHookResult = ReturnType<typeof useCreateDraftMutation>;
export type CreateDraftMutationResult = Apollo.MutationResult<CreateDraftMutation>;
export type CreateDraftMutationOptions = Apollo.BaseMutationOptions<CreateDraftMutation, CreateDraftMutationVariables>;
export const MetaFieldsDocument = gql`
    query metaFields {
  metaFields {
    user {
      showDefaultGreWordSearchPromptInputs
    }
  }
}
    `;

/**
 * __useMetaFieldsQuery__
 *
 * To run a query within a React component, call `useMetaFieldsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMetaFieldsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMetaFieldsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMetaFieldsQuery(baseOptions?: Apollo.QueryHookOptions<MetaFieldsQuery, MetaFieldsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MetaFieldsQuery, MetaFieldsQueryVariables>(MetaFieldsDocument, options);
      }
export function useMetaFieldsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MetaFieldsQuery, MetaFieldsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MetaFieldsQuery, MetaFieldsQueryVariables>(MetaFieldsDocument, options);
        }
export type MetaFieldsQueryHookResult = ReturnType<typeof useMetaFieldsQuery>;
export type MetaFieldsLazyQueryHookResult = ReturnType<typeof useMetaFieldsLazyQuery>;
export type MetaFieldsQueryResult = Apollo.QueryResult<MetaFieldsQuery, MetaFieldsQueryVariables>;