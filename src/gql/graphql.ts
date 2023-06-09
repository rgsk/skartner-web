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

export type EnumGreWordStatusFilter = {
  equals?: InputMaybe<GreWordStatus>;
  in?: InputMaybe<Array<GreWordStatus>>;
  not?: InputMaybe<GreWordStatus>;
  notIn?: InputMaybe<Array<GreWordStatus>>;
};

export type GptPrompt = {
  __typename?: 'GptPrompt';
  createdAt: Scalars['String'];
  editedResponse?: Maybe<Scalars['String']>;
  greWord?: Maybe<GreWord>;
  greWordId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  input: Scalars['String'];
  meta: Scalars['Json'];
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
  greWordTags?: Maybe<Array<GreWordTag>>;
  id: Scalars['String'];
  meta: Scalars['Json'];
  spelling: Scalars['String'];
  status: GreWordStatus;
  updatedAt: Scalars['String'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
};

export type GreWordOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  spelling?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GreWordSearchPromptInput = {
  __typename?: 'GreWordSearchPromptInput';
  createdAt: Scalars['String'];
  id: Scalars['String'];
  meta: Scalars['Json'];
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

export type GreWordSpellingUserIdCompoundUniqueInput = {
  spelling: Scalars['String'];
  userId: Scalars['String'];
};

export enum GreWordStatus {
  AlmostLearnt = 'ALMOST_LEARNT',
  FinishedLearning = 'FINISHED_LEARNING',
  Mastered = 'MASTERED',
  MemoryMode = 'MEMORY_MODE',
  StartedLearning = 'STARTED_LEARNING',
  StillLearning = 'STILL_LEARNING'
}

export type GreWordTag = {
  __typename?: 'GreWordTag';
  createdAt: Scalars['String'];
  greWords: Array<GreWord>;
  id: Scalars['String'];
  meta: Scalars['Json'];
  name: Scalars['String'];
  updatedAt: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export type GreWordTagListRelationFilter = {
  every?: InputMaybe<GreWordTagWhereInput>;
  none?: InputMaybe<GreWordTagWhereInput>;
  some?: InputMaybe<GreWordTagWhereInput>;
};

export type GreWordTagWhereInput = {
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type GreWordTagWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type GreWordWhereInput = {
  greWordTags?: InputMaybe<GreWordTagListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  spelling?: InputMaybe<StringFilter>;
  status?: InputMaybe<EnumGreWordStatusFilter>;
  user?: InputMaybe<UserWhereInput>;
  userId?: InputMaybe<StringFilter>;
};

export type GreWordWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  spelling_userId?: InputMaybe<GreWordSpellingUserIdCompoundUniqueInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createDraft?: Maybe<Post>;
  createGptPrompt: GptPrompt;
  createGreWord: GreWord;
  createGreWordSearchPromptInput: GreWordSearchPromptInput;
  createGreWordTag: GreWordTag;
  createNotification: Notification;
  createUser?: Maybe<User>;
  deleteGptPrompt?: Maybe<GptPrompt>;
  deleteGreWord?: Maybe<GreWord>;
  deleteGreWordSearchPromptInput?: Maybe<GreWordSearchPromptInput>;
  deleteGreWordTag: GreWordTag;
  publish?: Maybe<Post>;
  updateGptPrompt?: Maybe<GptPrompt>;
  updateGreWord?: Maybe<GreWord>;
  updateGreWordSearchPromptInput?: Maybe<GreWordSearchPromptInput>;
  updateUser?: Maybe<User>;
};


export type MutationCreateDraftArgs = {
  body: Scalars['String'];
  title: Scalars['String'];
};


export type MutationCreateGptPromptArgs = {
  greWordId: Scalars['String'];
  input: Scalars['String'];
  response: Scalars['String'];
};


export type MutationCreateGreWordArgs = {
  greWordTags?: InputMaybe<Array<InputMaybe<GreWordTagWhereUniqueInput>>>;
  promptInput: Scalars['String'];
  promptResponse: Scalars['String'];
  spelling: Scalars['String'];
  status?: InputMaybe<GreWordStatus>;
  userId: Scalars['String'];
};


export type MutationCreateGreWordSearchPromptInputArgs = {
  text: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationCreateGreWordTagArgs = {
  name: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationCreateNotificationArgs = {
  message: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  meta?: InputMaybe<UserMetaParsedJsonValueInput>;
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


export type MutationDeleteGreWordTagArgs = {
  name: Scalars['String'];
};


export type MutationPublishArgs = {
  draftId: Scalars['String'];
};


export type MutationUpdateGptPromptArgs = {
  editedResponse?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
};


export type MutationUpdateGreWordArgs = {
  greWordTags?: InputMaybe<Array<InputMaybe<GreWordTagWhereUniqueInput>>>;
  id: Scalars['String'];
  status?: InputMaybe<GreWordStatus>;
};


export type MutationUpdateGreWordSearchPromptInputArgs = {
  id: Scalars['String'];
  text: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  meta?: InputMaybe<UserMetaParsedJsonValueInput>;
};

export type Notification = {
  __typename?: 'Notification';
  message: Scalars['String'];
  userId: Scalars['String'];
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
  greWord?: Maybe<GreWord>;
  greWordSearchPromptInputs: Array<GreWordSearchPromptInput>;
  greWordTags: Array<GreWordTag>;
  greWords: Array<GreWord>;
  greWordsCount: Scalars['Int'];
  hello: HelloWorld;
  posts?: Maybe<Array<Maybe<Post>>>;
  sendSinglePrompt: SendSinglePromptResponse;
  user?: Maybe<User>;
  userSession?: Maybe<UserSession>;
  userSessions: Array<UserSession>;
  userSessionsCount: Scalars['Int'];
  users: Array<User>;
  usersCount: Scalars['Int'];
};


export type QueryAllPostsArgs = {
  isPublished: Scalars['Boolean'];
  token?: InputMaybe<Scalars['String']>;
};


export type QueryGptPromptsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryGreWordArgs = {
  where?: InputMaybe<GreWordWhereUniqueInput>;
};


export type QueryGreWordSearchPromptInputsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GreWordSearchPromptInputWhereInput>;
};


export type QueryGreWordTagsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GreWordTagWhereInput>;
};


export type QueryGreWordsArgs = {
  orderBy?: InputMaybe<Array<InputMaybe<GreWordOrderByWithRelationInput>>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GreWordWhereInput>;
};


export type QueryGreWordsCountArgs = {
  where?: InputMaybe<GreWordWhereInput>;
};


export type QuerySendSinglePromptArgs = {
  indexesReturned?: InputMaybe<Array<Scalars['Int']>>;
  input: Scalars['String'];
  resultIndexFromCache?: InputMaybe<Scalars['Int']>;
  skipCache?: InputMaybe<Scalars['Boolean']>;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUserSessionArgs = {
  where: UserSessionWhereUniqueInput;
};


export type QueryUserSessionsArgs = {
  orderBy?: InputMaybe<Array<InputMaybe<UserSessionOrderByWithRelationInput>>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserSessionWhereInput>;
};


export type QueryUserSessionsCountArgs = {
  where?: InputMaybe<UserSessionWhereInput>;
};


export type QueryUsersArgs = {
  orderBy?: InputMaybe<Array<InputMaybe<UserOrderByWithRelationInput>>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryUsersCountArgs = {
  where?: InputMaybe<UserWhereInput>;
};

export type SendSinglePromptResponse = {
  __typename?: 'SendSinglePromptResponse';
  error?: Maybe<Scalars['String']>;
  result?: Maybe<Scalars['String']>;
  resultIndex?: Maybe<Scalars['Int']>;
  totalResultsInCache: Scalars['Int'];
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

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

export type Subscription = {
  __typename?: 'Subscription';
  notificationReceived?: Maybe<Notification>;
  truths?: Maybe<Scalars['Boolean']>;
};


export type SubscriptionNotificationReceivedArgs = {
  userId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  gptPrompts: Array<GptPrompt>;
  greWordSearchPromptInputs: Array<GreWordSearchPromptInput>;
  greWordTags: Array<GreWordTag>;
  greWords: Array<GreWord>;
  id: Scalars['String'];
  meta: UserMetaParsedJsonValue;
  updatedAt: Scalars['String'];
};

export type UserMetaParsedJsonValue = {
  __typename?: 'UserMetaParsedJsonValue';
  defaultGreWordSearchPromptInput?: Maybe<Scalars['String']>;
  showDefaultGreWordSearchPromptInputs?: Maybe<Scalars['Boolean']>;
};

export type UserMetaParsedJsonValueInput = {
  defaultGreWordSearchPromptInput?: InputMaybe<Scalars['String']>;
  showDefaultGreWordSearchPromptInputs?: InputMaybe<Scalars['Boolean']>;
};

export type UserOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type UserSession = {
  __typename?: 'UserSession';
  duration?: Maybe<Scalars['Int']>;
  endedAt?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  meta: UserSessionMetaParsedJsonValue;
  startedAt: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export type UserSessionMetaParsedJsonValue = {
  __typename?: 'UserSessionMetaParsedJsonValue';
  none?: Maybe<Scalars['String']>;
};

export type UserSessionMetaParsedJsonValueInput = {
  none?: InputMaybe<Scalars['String']>;
};

export type UserSessionOrderByWithRelationInput = {
  duration?: InputMaybe<SortOrder>;
  endedAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  startedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
};

export type UserSessionWhereInput = {
  id?: InputMaybe<StringFilter>;
  user?: InputMaybe<UserWhereInput>;
  userId?: InputMaybe<StringFilter>;
};

export type UserSessionWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type UserWhereInput = {
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
};

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export type HelloWorld = {
  __typename?: 'helloWorld';
  message: Scalars['String'];
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
  meta?: InputMaybe<UserMetaParsedJsonValueInput>;
}>;


export type UpdateMetaForUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'User', id: string, email: string, meta: { __typename?: 'UserMetaParsedJsonValue', defaultGreWordSearchPromptInput?: string | null, showDefaultGreWordSearchPromptInputs?: boolean | null } } | null };

export type SendSinglePromptQueryVariables = Exact<{
  input: Scalars['String'];
  skipCache?: InputMaybe<Scalars['Boolean']>;
  indexesReturned?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
  resultIndexFromCache?: InputMaybe<Scalars['Int']>;
}>;


export type SendSinglePromptQuery = { __typename?: 'Query', sendSinglePrompt: { __typename?: 'SendSinglePromptResponse', result?: string | null, resultIndex?: number | null, error?: string | null, totalResultsInCache: number } };

export type CreateGreWordMutationVariables = Exact<{
  spelling: Scalars['String'];
  promptInput: Scalars['String'];
  promptResponse: Scalars['String'];
  userId: Scalars['String'];
  greWordTags?: InputMaybe<Array<InputMaybe<GreWordTagWhereUniqueInput>> | InputMaybe<GreWordTagWhereUniqueInput>>;
}>;


export type CreateGreWordMutation = { __typename?: 'Mutation', createGreWord: { __typename?: 'GreWord', id: string, spelling: string, status: GreWordStatus, gptPrompts: Array<{ __typename?: 'GptPrompt', id: string, input: string, response: string, editedResponse?: string | null, greWordId?: string | null }>, greWordTags?: Array<{ __typename?: 'GreWordTag', id: string, name: string }> | null } };

export type GreConfigurationQueryVariables = Exact<{ [key: string]: never; }>;


export type GreConfigurationQuery = { __typename?: 'Query', greConfiguration: { __typename?: 'GreConfiguration', defaultGreWordSearchPromptInputs: Array<string> } };

export type CreateGreWordTagMutationVariables = Exact<{
  name: Scalars['String'];
  userId: Scalars['String'];
}>;


export type CreateGreWordTagMutation = { __typename?: 'Mutation', createGreWordTag: { __typename?: 'GreWordTag', id: string, name: string } };

export type DeleteGreWordTagMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type DeleteGreWordTagMutation = { __typename?: 'Mutation', deleteGreWordTag: { __typename?: 'GreWordTag', id: string, name: string } };

export type CreateGptPromptMutationVariables = Exact<{
  input: Scalars['String'];
  response: Scalars['String'];
  greWordId: Scalars['String'];
}>;


export type CreateGptPromptMutation = { __typename?: 'Mutation', createGptPrompt: { __typename?: 'GptPrompt', id: string, response: string } };

export type GreWordFieldsFragment = { __typename?: 'GreWord', id: string, spelling: string, status: GreWordStatus, gptPrompts: Array<{ __typename?: 'GptPrompt', id: string, input: string, response: string, editedResponse?: string | null, greWordId?: string | null }>, greWordTags?: Array<{ __typename?: 'GreWordTag', id: string, name: string }> | null };

export type GreWordsQueryVariables = Exact<{
  where?: InputMaybe<GreWordWhereInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<InputMaybe<GreWordOrderByWithRelationInput>> | InputMaybe<GreWordOrderByWithRelationInput>>;
}>;


export type GreWordsQuery = { __typename?: 'Query', greWordsCount: number, greWords: Array<{ __typename?: 'GreWord', id: string, spelling: string, status: GreWordStatus, gptPrompts: Array<{ __typename?: 'GptPrompt', id: string, input: string, response: string, editedResponse?: string | null, greWordId?: string | null }>, greWordTags?: Array<{ __typename?: 'GreWordTag', id: string, name: string }> | null }> };

export type StatusWiseGreWordCountQueryVariables = Exact<{
  userId: Scalars['String'];
  greWordTags?: InputMaybe<GreWordTagListRelationFilter>;
}>;


export type StatusWiseGreWordCountQuery = { __typename?: 'Query', STARTED_LEARNING: number, STILL_LEARNING: number, ALMOST_LEARNT: number, FINISHED_LEARNING: number, MEMORY_MODE: number, MASTERED: number };

export type DeleteGreWordMutationVariables = Exact<{
  deleteGreWordId: Scalars['String'];
}>;


export type DeleteGreWordMutation = { __typename?: 'Mutation', deleteGreWord?: { __typename?: 'GreWord', id: string } | null };

export type DeleteGptPromptMutationVariables = Exact<{
  deleteGptPromptId: Scalars['String'];
}>;


export type DeleteGptPromptMutation = { __typename?: 'Mutation', deleteGptPrompt?: { __typename?: 'GptPrompt', id: string } | null };

export type UpdateGptPromptMutationVariables = Exact<{
  id: Scalars['String'];
  editedResponse?: InputMaybe<Scalars['String']>;
}>;


export type UpdateGptPromptMutation = { __typename?: 'Mutation', updateGptPrompt?: { __typename?: 'GptPrompt', id: string, editedResponse?: string | null } | null };

export type GreWordTagsQueryVariables = Exact<{
  where?: InputMaybe<GreWordTagWhereInput>;
}>;


export type GreWordTagsQuery = { __typename?: 'Query', greWordTags: Array<{ __typename?: 'GreWordTag', id: string, name: string }> };

export type UpdateGreWordMutationVariables = Exact<{
  updateGreWordId: Scalars['String'];
  greWordTags?: InputMaybe<Array<InputMaybe<GreWordTagWhereUniqueInput>> | InputMaybe<GreWordTagWhereUniqueInput>>;
  status?: InputMaybe<GreWordStatus>;
}>;


export type UpdateGreWordMutation = { __typename?: 'Mutation', updateGreWord?: { __typename?: 'GreWord', id: string } | null };

export type UserFieldsFragment = { __typename?: 'User', id: string, email: string, meta: { __typename?: 'UserMetaParsedJsonValue', defaultGreWordSearchPromptInput?: string | null, showDefaultGreWordSearchPromptInputs?: boolean | null } };

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'User', id: string, email: string, meta: { __typename?: 'UserMetaParsedJsonValue', defaultGreWordSearchPromptInput?: string | null, showDefaultGreWordSearchPromptInputs?: boolean | null } } | null };

export type UserQueryVariables = Exact<{
  where: UserWhereUniqueInput;
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, email: string, meta: { __typename?: 'UserMetaParsedJsonValue', defaultGreWordSearchPromptInput?: string | null, showDefaultGreWordSearchPromptInputs?: boolean | null } } | null };

export type DraftsForPracticeQueryVariables = Exact<{ [key: string]: never; }>;


export type DraftsForPracticeQuery = { __typename?: 'Query', drafts?: Array<{ __typename?: 'Post', id: string, title?: string | null, body?: string | null, createdAt: string } | null> | null };

export type CreateDraftMutationVariables = Exact<{
  title: Scalars['String'];
  body: Scalars['String'];
}>;


export type CreateDraftMutation = { __typename?: 'Mutation', createDraft?: { __typename?: 'Post', id: string, title?: string | null, body?: string | null } | null };

export type NotificationReceivedSubscriptionVariables = Exact<{
  userId: Scalars['String'];
}>;


export type NotificationReceivedSubscription = { __typename?: 'Subscription', notificationReceived?: { __typename?: 'Notification', message: string, userId: string } | null };

export const GreWordFieldsFragmentDoc = gql`
    fragment GreWordFields on GreWord {
  id
  spelling
  status
  gptPrompts {
    id
    input
    response
    editedResponse
    greWordId
  }
  greWordTags {
    id
    name
  }
}
    `;
export const UserFieldsFragmentDoc = gql`
    fragment UserFields on User {
  id
  email
  meta {
    defaultGreWordSearchPromptInput
    showDefaultGreWordSearchPromptInputs
  }
}
    `;
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
    mutation updateMetaForUser($id: String, $email: String, $meta: UserMetaParsedJsonValueInput) {
  updateUser(id: $id, email: $email, meta: $meta) {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;
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
    query sendSinglePrompt($input: String!, $skipCache: Boolean, $indexesReturned: [Int!], $resultIndexFromCache: Int) {
  sendSinglePrompt(
    input: $input
    skipCache: $skipCache
    indexesReturned: $indexesReturned
    resultIndexFromCache: $resultIndexFromCache
  ) {
    result
    resultIndex
    error
    totalResultsInCache
  }
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
 *      skipCache: // value for 'skipCache'
 *      indexesReturned: // value for 'indexesReturned'
 *      resultIndexFromCache: // value for 'resultIndexFromCache'
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
    mutation createGreWord($spelling: String!, $promptInput: String!, $promptResponse: String!, $userId: String!, $greWordTags: [GreWordTagWhereUniqueInput]) {
  createGreWord(
    spelling: $spelling
    promptInput: $promptInput
    promptResponse: $promptResponse
    userId: $userId
    greWordTags: $greWordTags
  ) {
    ...GreWordFields
  }
}
    ${GreWordFieldsFragmentDoc}`;
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
 *      greWordTags: // value for 'greWordTags'
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
export const CreateGreWordTagDocument = gql`
    mutation CreateGreWordTag($name: String!, $userId: String!) {
  createGreWordTag(name: $name, userId: $userId) {
    id
    name
  }
}
    `;
export type CreateGreWordTagMutationFn = Apollo.MutationFunction<CreateGreWordTagMutation, CreateGreWordTagMutationVariables>;

/**
 * __useCreateGreWordTagMutation__
 *
 * To run a mutation, you first call `useCreateGreWordTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGreWordTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGreWordTagMutation, { data, loading, error }] = useCreateGreWordTagMutation({
 *   variables: {
 *      name: // value for 'name'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useCreateGreWordTagMutation(baseOptions?: Apollo.MutationHookOptions<CreateGreWordTagMutation, CreateGreWordTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGreWordTagMutation, CreateGreWordTagMutationVariables>(CreateGreWordTagDocument, options);
      }
export type CreateGreWordTagMutationHookResult = ReturnType<typeof useCreateGreWordTagMutation>;
export type CreateGreWordTagMutationResult = Apollo.MutationResult<CreateGreWordTagMutation>;
export type CreateGreWordTagMutationOptions = Apollo.BaseMutationOptions<CreateGreWordTagMutation, CreateGreWordTagMutationVariables>;
export const DeleteGreWordTagDocument = gql`
    mutation DeleteGreWordTag($name: String!) {
  deleteGreWordTag(name: $name) {
    id
    name
  }
}
    `;
export type DeleteGreWordTagMutationFn = Apollo.MutationFunction<DeleteGreWordTagMutation, DeleteGreWordTagMutationVariables>;

/**
 * __useDeleteGreWordTagMutation__
 *
 * To run a mutation, you first call `useDeleteGreWordTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGreWordTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGreWordTagMutation, { data, loading, error }] = useDeleteGreWordTagMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useDeleteGreWordTagMutation(baseOptions?: Apollo.MutationHookOptions<DeleteGreWordTagMutation, DeleteGreWordTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteGreWordTagMutation, DeleteGreWordTagMutationVariables>(DeleteGreWordTagDocument, options);
      }
export type DeleteGreWordTagMutationHookResult = ReturnType<typeof useDeleteGreWordTagMutation>;
export type DeleteGreWordTagMutationResult = Apollo.MutationResult<DeleteGreWordTagMutation>;
export type DeleteGreWordTagMutationOptions = Apollo.BaseMutationOptions<DeleteGreWordTagMutation, DeleteGreWordTagMutationVariables>;
export const CreateGptPromptDocument = gql`
    mutation createGptPrompt($input: String!, $response: String!, $greWordId: String!) {
  createGptPrompt(input: $input, response: $response, greWordId: $greWordId) {
    id
    response
  }
}
    `;
export type CreateGptPromptMutationFn = Apollo.MutationFunction<CreateGptPromptMutation, CreateGptPromptMutationVariables>;

/**
 * __useCreateGptPromptMutation__
 *
 * To run a mutation, you first call `useCreateGptPromptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGptPromptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGptPromptMutation, { data, loading, error }] = useCreateGptPromptMutation({
 *   variables: {
 *      input: // value for 'input'
 *      response: // value for 'response'
 *      greWordId: // value for 'greWordId'
 *   },
 * });
 */
export function useCreateGptPromptMutation(baseOptions?: Apollo.MutationHookOptions<CreateGptPromptMutation, CreateGptPromptMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGptPromptMutation, CreateGptPromptMutationVariables>(CreateGptPromptDocument, options);
      }
export type CreateGptPromptMutationHookResult = ReturnType<typeof useCreateGptPromptMutation>;
export type CreateGptPromptMutationResult = Apollo.MutationResult<CreateGptPromptMutation>;
export type CreateGptPromptMutationOptions = Apollo.BaseMutationOptions<CreateGptPromptMutation, CreateGptPromptMutationVariables>;
export const GreWordsDocument = gql`
    query greWords($where: GreWordWhereInput, $skip: Int, $take: Int, $orderBy: [GreWordOrderByWithRelationInput]) {
  greWords(where: $where, skip: $skip, take: $take, orderBy: $orderBy) {
    ...GreWordFields
  }
  greWordsCount(where: $where)
}
    ${GreWordFieldsFragmentDoc}`;

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
 *      orderBy: // value for 'orderBy'
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
export const StatusWiseGreWordCountDocument = gql`
    query StatusWiseGreWordCount($userId: String!, $greWordTags: GreWordTagListRelationFilter) {
  STARTED_LEARNING: greWordsCount(
    where: {status: {equals: STARTED_LEARNING}, userId: {equals: $userId}, greWordTags: $greWordTags}
  )
  STILL_LEARNING: greWordsCount(
    where: {status: {equals: STILL_LEARNING}, userId: {equals: $userId}, greWordTags: $greWordTags}
  )
  ALMOST_LEARNT: greWordsCount(
    where: {status: {equals: ALMOST_LEARNT}, userId: {equals: $userId}, greWordTags: $greWordTags}
  )
  FINISHED_LEARNING: greWordsCount(
    where: {status: {equals: FINISHED_LEARNING}, userId: {equals: $userId}, greWordTags: $greWordTags}
  )
  MEMORY_MODE: greWordsCount(
    where: {status: {equals: MEMORY_MODE}, userId: {equals: $userId}, greWordTags: $greWordTags}
  )
  MASTERED: greWordsCount(
    where: {status: {equals: MASTERED}, userId: {equals: $userId}, greWordTags: $greWordTags}
  )
}
    `;

/**
 * __useStatusWiseGreWordCountQuery__
 *
 * To run a query within a React component, call `useStatusWiseGreWordCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useStatusWiseGreWordCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStatusWiseGreWordCountQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      greWordTags: // value for 'greWordTags'
 *   },
 * });
 */
export function useStatusWiseGreWordCountQuery(baseOptions: Apollo.QueryHookOptions<StatusWiseGreWordCountQuery, StatusWiseGreWordCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StatusWiseGreWordCountQuery, StatusWiseGreWordCountQueryVariables>(StatusWiseGreWordCountDocument, options);
      }
export function useStatusWiseGreWordCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StatusWiseGreWordCountQuery, StatusWiseGreWordCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StatusWiseGreWordCountQuery, StatusWiseGreWordCountQueryVariables>(StatusWiseGreWordCountDocument, options);
        }
export type StatusWiseGreWordCountQueryHookResult = ReturnType<typeof useStatusWiseGreWordCountQuery>;
export type StatusWiseGreWordCountLazyQueryHookResult = ReturnType<typeof useStatusWiseGreWordCountLazyQuery>;
export type StatusWiseGreWordCountQueryResult = Apollo.QueryResult<StatusWiseGreWordCountQuery, StatusWiseGreWordCountQueryVariables>;
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
export const UpdateGptPromptDocument = gql`
    mutation UpdateGptPrompt($id: String!, $editedResponse: String) {
  updateGptPrompt(id: $id, editedResponse: $editedResponse) {
    id
    editedResponse
  }
}
    `;
export type UpdateGptPromptMutationFn = Apollo.MutationFunction<UpdateGptPromptMutation, UpdateGptPromptMutationVariables>;

/**
 * __useUpdateGptPromptMutation__
 *
 * To run a mutation, you first call `useUpdateGptPromptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGptPromptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGptPromptMutation, { data, loading, error }] = useUpdateGptPromptMutation({
 *   variables: {
 *      id: // value for 'id'
 *      editedResponse: // value for 'editedResponse'
 *   },
 * });
 */
export function useUpdateGptPromptMutation(baseOptions?: Apollo.MutationHookOptions<UpdateGptPromptMutation, UpdateGptPromptMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateGptPromptMutation, UpdateGptPromptMutationVariables>(UpdateGptPromptDocument, options);
      }
export type UpdateGptPromptMutationHookResult = ReturnType<typeof useUpdateGptPromptMutation>;
export type UpdateGptPromptMutationResult = Apollo.MutationResult<UpdateGptPromptMutation>;
export type UpdateGptPromptMutationOptions = Apollo.BaseMutationOptions<UpdateGptPromptMutation, UpdateGptPromptMutationVariables>;
export const GreWordTagsDocument = gql`
    query greWordTags($where: GreWordTagWhereInput) {
  greWordTags(where: $where) {
    id
    name
  }
}
    `;

/**
 * __useGreWordTagsQuery__
 *
 * To run a query within a React component, call `useGreWordTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGreWordTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGreWordTagsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGreWordTagsQuery(baseOptions?: Apollo.QueryHookOptions<GreWordTagsQuery, GreWordTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GreWordTagsQuery, GreWordTagsQueryVariables>(GreWordTagsDocument, options);
      }
export function useGreWordTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GreWordTagsQuery, GreWordTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GreWordTagsQuery, GreWordTagsQueryVariables>(GreWordTagsDocument, options);
        }
export type GreWordTagsQueryHookResult = ReturnType<typeof useGreWordTagsQuery>;
export type GreWordTagsLazyQueryHookResult = ReturnType<typeof useGreWordTagsLazyQuery>;
export type GreWordTagsQueryResult = Apollo.QueryResult<GreWordTagsQuery, GreWordTagsQueryVariables>;
export const UpdateGreWordDocument = gql`
    mutation updateGreWord($updateGreWordId: String!, $greWordTags: [GreWordTagWhereUniqueInput], $status: GreWordStatus) {
  updateGreWord(id: $updateGreWordId, greWordTags: $greWordTags, status: $status) {
    id
  }
}
    `;
export type UpdateGreWordMutationFn = Apollo.MutationFunction<UpdateGreWordMutation, UpdateGreWordMutationVariables>;

/**
 * __useUpdateGreWordMutation__
 *
 * To run a mutation, you first call `useUpdateGreWordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGreWordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGreWordMutation, { data, loading, error }] = useUpdateGreWordMutation({
 *   variables: {
 *      updateGreWordId: // value for 'updateGreWordId'
 *      greWordTags: // value for 'greWordTags'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateGreWordMutation(baseOptions?: Apollo.MutationHookOptions<UpdateGreWordMutation, UpdateGreWordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateGreWordMutation, UpdateGreWordMutationVariables>(UpdateGreWordDocument, options);
      }
export type UpdateGreWordMutationHookResult = ReturnType<typeof useUpdateGreWordMutation>;
export type UpdateGreWordMutationResult = Apollo.MutationResult<UpdateGreWordMutation>;
export type UpdateGreWordMutationOptions = Apollo.BaseMutationOptions<UpdateGreWordMutation, UpdateGreWordMutationVariables>;
export const CreateUserDocument = gql`
    mutation createUser($email: String!) {
  createUser(email: $email) {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;
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
export const UserDocument = gql`
    query User($where: UserWhereUniqueInput!) {
  user(where: $where) {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
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
export const NotificationReceivedDocument = gql`
    subscription NotificationReceived($userId: String!) {
  notificationReceived(userId: $userId) {
    message
    userId
  }
}
    `;

/**
 * __useNotificationReceivedSubscription__
 *
 * To run a query within a React component, call `useNotificationReceivedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNotificationReceivedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationReceivedSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useNotificationReceivedSubscription(baseOptions: Apollo.SubscriptionHookOptions<NotificationReceivedSubscription, NotificationReceivedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NotificationReceivedSubscription, NotificationReceivedSubscriptionVariables>(NotificationReceivedDocument, options);
      }
export type NotificationReceivedSubscriptionHookResult = ReturnType<typeof useNotificationReceivedSubscription>;
export type NotificationReceivedSubscriptionResult = Apollo.SubscriptionResult<NotificationReceivedSubscription>;