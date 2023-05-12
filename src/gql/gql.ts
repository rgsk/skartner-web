/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query sendSinglePrompt($input: String!) {\n  sendSinglePrompt(input: $input)\n}\n\nmutation createGreWord($spelling: String!, $promptInput: String!, $promptResponse: String!) {\n  createGreWord(\n    spelling: $spelling\n    promptInput: $promptInput\n    promptResponse: $promptResponse\n  ) {\n    id\n  }\n}": types.SendSinglePromptDocument,
    "query greWords($offset: Int, $limit: Int, $where: greWordsBoolExp) {\n  greWords(offset: $offset, limit: $limit, where: $where) {\n    id\n    spelling\n    gptPrompts {\n      id\n      input\n      response\n    }\n  }\n}": types.GreWordsDocument,
    "query draftsForPractice {\n  drafts {\n    id\n    title\n    body\n    createdAt\n  }\n}\n\nmutation createDraft($title: String!, $body: String!) {\n  createDraft(title: $title, body: $body) {\n    id\n    title\n    body\n  }\n}": types.DraftsForPracticeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query sendSinglePrompt($input: String!) {\n  sendSinglePrompt(input: $input)\n}\n\nmutation createGreWord($spelling: String!, $promptInput: String!, $promptResponse: String!) {\n  createGreWord(\n    spelling: $spelling\n    promptInput: $promptInput\n    promptResponse: $promptResponse\n  ) {\n    id\n  }\n}"): (typeof documents)["query sendSinglePrompt($input: String!) {\n  sendSinglePrompt(input: $input)\n}\n\nmutation createGreWord($spelling: String!, $promptInput: String!, $promptResponse: String!) {\n  createGreWord(\n    spelling: $spelling\n    promptInput: $promptInput\n    promptResponse: $promptResponse\n  ) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query greWords($offset: Int, $limit: Int, $where: greWordsBoolExp) {\n  greWords(offset: $offset, limit: $limit, where: $where) {\n    id\n    spelling\n    gptPrompts {\n      id\n      input\n      response\n    }\n  }\n}"): (typeof documents)["query greWords($offset: Int, $limit: Int, $where: greWordsBoolExp) {\n  greWords(offset: $offset, limit: $limit, where: $where) {\n    id\n    spelling\n    gptPrompts {\n      id\n      input\n      response\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query draftsForPractice {\n  drafts {\n    id\n    title\n    body\n    createdAt\n  }\n}\n\nmutation createDraft($title: String!, $body: String!) {\n  createDraft(title: $title, body: $body) {\n    id\n    title\n    body\n  }\n}"): (typeof documents)["query draftsForPractice {\n  drafts {\n    id\n    title\n    body\n    createdAt\n  }\n}\n\nmutation createDraft($title: String!, $body: String!) {\n  createDraft(title: $title, body: $body) {\n    id\n    title\n    body\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;