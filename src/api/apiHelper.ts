import axiosInstance from 'lib/axiosInstance';

export const buildApiService = <
  Y extends string,
  T extends Record<Y, any>,
  Z extends Record<Y, any>
>({
  paths,
  endpoints,
  sampleResponses,
  baseUrl,
}: {
  paths: Record<Y, Y>;
  endpoints: T;
  sampleResponses: Z;
  baseUrl: string;
}) => {
  const getRequest = <K extends Y>(path: K) => {
    return (...params: Parameters<T[K]>) =>
      <V extends keyof Z[K]>(responseType: V) => {
        const { endpoint, key } = endpoints[path](...params);
        return {
          fn: async () => {
            const response = await axiosInstance.get<Z[K][V]>(
              `${baseUrl}/${endpoint}`
            );
            return response.data;
          },
          key: key,
        };
      };
  };

  return { getRequest };
};
