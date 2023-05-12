/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
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
};

export type GreWord = {
  __typename?: 'GreWord';
  createdAt: Scalars['String'];
  gptPrompts: Array<GptPrompt>;
  id: Scalars['String'];
  spelling: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createDraft?: Maybe<Post>;
  createGreWord?: Maybe<GreWord>;
  publish?: Maybe<Post>;
};


export type MutationCreateDraftArgs = {
  body: Scalars['String'];
  title: Scalars['String'];
};


export type MutationCreateGreWordArgs = {
  promptInput: Scalars['String'];
  promptResponse: Scalars['String'];
  spelling: Scalars['String'];
};


export type MutationPublishArgs = {
  draftId: Scalars['String'];
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
  greWords: Array<GreWord>;
  posts?: Maybe<Array<Maybe<Post>>>;
  sendSinglePrompt?: Maybe<Scalars['String']>;
};


export type QueryAllPostsArgs = {
  isPublished: Scalars['Boolean'];
  token?: InputMaybe<Scalars['String']>;
};


export type QueryGptPromptsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryGreWordsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GreWordsBoolExp>;
};


export type QuerySendSinglePromptArgs = {
  input: Scalars['String'];
};

export type StringComparisonExp = {
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

export type GreWordsBoolExp = {
  id?: InputMaybe<UuidComparisonExp>;
  spelling?: InputMaybe<StringComparisonExp>;
};

export type UuidComparisonExp = {
  _eq?: InputMaybe<Scalars['String']>;
};

export type SendSinglePromptQueryVariables = Exact<{
  input: Scalars['String'];
}>;


export type SendSinglePromptQuery = { __typename?: 'Query', sendSinglePrompt?: string | null };

export type CreateGreWordMutationVariables = Exact<{
  spelling: Scalars['String'];
  promptInput: Scalars['String'];
  promptResponse: Scalars['String'];
}>;


export type CreateGreWordMutation = { __typename?: 'Mutation', createGreWord?: { __typename?: 'GreWord', id: string } | null };

export type GreWordsQueryVariables = Exact<{
  where?: InputMaybe<GreWordsBoolExp>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
}>;


export type GreWordsQuery = { __typename?: 'Query', greWords: Array<{ __typename?: 'GreWord', id: string, spelling: string, gptPrompts: Array<{ __typename?: 'GptPrompt', id: string, input: string, response: string }> }> };

export type DraftsForPracticeQueryVariables = Exact<{ [key: string]: never; }>;


export type DraftsForPracticeQuery = { __typename?: 'Query', drafts?: Array<{ __typename?: 'Post', id: string, title?: string | null, body?: string | null, createdAt: string } | null> | null };

export type CreateDraftMutationVariables = Exact<{
  title: Scalars['String'];
  body: Scalars['String'];
}>;


export type CreateDraftMutation = { __typename?: 'Mutation', createDraft?: { __typename?: 'Post', id: string, title?: string | null, body?: string | null } | null };


export const SendSinglePromptDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"sendSinglePrompt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendSinglePrompt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<SendSinglePromptQuery, SendSinglePromptQueryVariables>;
export const CreateGreWordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createGreWord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"spelling"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"promptInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"promptResponse"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGreWord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spelling"},"value":{"kind":"Variable","name":{"kind":"Name","value":"spelling"}}},{"kind":"Argument","name":{"kind":"Name","value":"promptInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"promptInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"promptResponse"},"value":{"kind":"Variable","name":{"kind":"Name","value":"promptResponse"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateGreWordMutation, CreateGreWordMutationVariables>;
export const GreWordsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"greWords"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"greWordsBoolExp"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"greWords"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"spelling"}},{"kind":"Field","name":{"kind":"Name","value":"gptPrompts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"input"}},{"kind":"Field","name":{"kind":"Name","value":"response"}}]}}]}}]}}]} as unknown as DocumentNode<GreWordsQuery, GreWordsQueryVariables>;
export const DraftsForPracticeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"draftsForPractice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"drafts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<DraftsForPracticeQuery, DraftsForPracticeQueryVariables>;
export const CreateDraftDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createDraft"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"body"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDraft"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"body"},"value":{"kind":"Variable","name":{"kind":"Name","value":"body"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}}]}}]}}]} as unknown as DocumentNode<CreateDraftMutation, CreateDraftMutationVariables>;