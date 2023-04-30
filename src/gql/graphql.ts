/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  createDraft?: Maybe<Post>;
  publish?: Maybe<Post>;
};

export type MutationCreateDraftArgs = {
  body: Scalars['String'];
  title: Scalars['String'];
};

export type MutationPublishArgs = {
  draftId: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  body?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isPublished?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  drafts?: Maybe<Array<Maybe<Post>>>;
  posts?: Maybe<Array<Maybe<Post>>>;
};

export type DraftsForPracticeQueryVariables = Exact<{ [key: string]: never }>;

export type DraftsForPracticeQuery = {
  __typename?: 'Query';
  drafts?: Array<{
    __typename?: 'Post';
    id: string;
    title?: string | null;
    body?: string | null;
    createdAt?: string | null;
  } | null> | null;
};

export type CreateDraftMutationVariables = Exact<{
  title: Scalars['String'];
  body: Scalars['String'];
}>;

export type CreateDraftMutation = {
  __typename?: 'Mutation';
  createDraft?: {
    __typename?: 'Post';
    id: string;
    title?: string | null;
    body?: string | null;
  } | null;
};

export const DraftsForPracticeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'draftsForPractice' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'drafts' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'body' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DraftsForPracticeQuery,
  DraftsForPracticeQueryVariables
>;
export const CreateDraftDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createDraft' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'title' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'body' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createDraft' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'title' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'title' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'body' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'body' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'body' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateDraftMutation, CreateDraftMutationVariables>;
