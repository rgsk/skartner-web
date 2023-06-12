import axiosInstance from 'lib/axiosInstance';
import environmentVars from 'lib/environmentVars';
import sampleResponses from './sampleResponses';

export const endpoints = {
  'pincode/:pincode': ({ pincode }: { pincode: string }) => ({
    endpoint: `pincode/${pincode}`,
    key: ['pincode', pincode],
  }),
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

const apiService = {
  getPostOffices,
};
export default apiService;
