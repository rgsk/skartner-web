import axiosInstance from 'lib/axiosInstance';
import environmentVars from 'lib/environmentVars';
import { buildQuery } from 'lib/queryParamsUtils';
import sampleResponses from './sampleResponses';

export const endpoints = {
  'pincode/:pincode': ({ pincode }: { pincode: string }) => {
    return {
      endpoint: `pincode/${pincode}`,
      key: ['pincode', pincode],
    };
  },
  places: ({
    input,
    location,
    pincode,
  }: {
    input: string;
    location?: string;
    pincode?: string;
  }) => {
    const query = buildQuery({ input, location, pincode });
    return {
      endpoint: `places?${query}`,
      key: ['places', query],
      // TODO: check if passing object as key or passing string is better
    };
  },
};

export type PostOffice =
  (typeof sampleResponses)['getPostOffices'][number]['response'][number]['PostOffice'][number];

const getPostOffices = (
  params: Parameters<(typeof endpoints)['pincode/:pincode']>[0]
) => {
  const { endpoint, key } = endpoints['pincode/:pincode'](params);
  return {
    fn: async () => {
      const response = await axiosInstance.get<
        (typeof sampleResponses)['getPostOffices'][number]['response']
      >(`${environmentVars.SKARTNER_SERVER}/${endpoint}`);
      return response.data;
    },
    key: key,
  };
};

const getPlaceSuggestions = (
  params: Parameters<(typeof endpoints)['places']>[0]
) => {
  const { endpoint, key } = endpoints['places'](params);
  return {
    fn: async () => {
      const response = await axiosInstance.get<
        (typeof sampleResponses)['getPlaceSuggestions'][number]['response']
      >(`${environmentVars.SKARTNER_SERVER}/${endpoint}`);
      return response.data;
    },
    key: key,
  };
};

const apiService = {
  getPostOffices,
  getPlaceSuggestions,
};
export default apiService;
