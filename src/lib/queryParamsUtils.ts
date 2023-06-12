export const removeParamsFromQuery = (query: string, params: string[]) => {
  const urlSearchParams = new URLSearchParams(query);
  for (let param of params) {
    urlSearchParams.delete(param);
  }
  return urlSearchParams.toString();
};

export const buildQuery = (
  obj: Record<string, string | string[] | undefined>
) => {
  const urlSearchParams = new URLSearchParams();
  for (let [param, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      for (let v of value) {
        urlSearchParams.append(param, v);
      }
    } else {
      if (value !== undefined) {
        urlSearchParams.append(param, value);
      }
    }
  }
  return urlSearchParams.toString();
};

export const addParamsToQuery = (
  query: string,
  obj: Record<string, string | string[]>
) => {
  const urlSearchParams = new URLSearchParams(query);
  for (let [param, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      for (let v of value) {
        urlSearchParams.append(param, v);
      }
    } else {
      urlSearchParams.append(param, value);
    }
  }
  return urlSearchParams.toString();
};

export const removeParamsFromPath = (
  pathWithQuery: string,
  params: string[]
) => {
  const [path, query] = pathWithQuery.split('?');
  const newQuery = removeParamsFromQuery(query, params);
  if (newQuery.length === 0) {
    return path;
  }
  const finalPath = path + '?' + newQuery;
  return finalPath;
};
export const addParamsToPath = (
  pathWithQuery: string,
  obj: Record<string, string | string[]>
) => {
  const [path, query] = pathWithQuery.split('?');
  const newQuery = addParamsToQuery(query, obj);
  if (newQuery.length === 0) {
    return path;
  }
  const finalPath = path + '?' + newQuery;
  return finalPath;
};

export const updateParamsForQuery = (
  query: string,
  obj: Record<string, string | string[]>
) => {
  const urlSearchParams = new URLSearchParams(query);
  for (let [param, value] of Object.entries(obj)) {
    urlSearchParams.delete(param);
    if (value !== ValueToDeleteQueryKey) {
      if (Array.isArray(value)) {
        for (let v of value) {
          urlSearchParams.append(param, v);
        }
      } else {
        urlSearchParams.append(param, value);
      }
    }
  }
  return urlSearchParams.toString();
};

export const updateParamsForPath = (
  pathWithQuery: string,
  obj: Record<string, string | string[]>
) => {
  const [path, query] = pathWithQuery.split('?');
  const newQuery = updateParamsForQuery(query, obj);
  if (newQuery.length === 0) {
    return path;
  }
  const finalPath = path + '?' + newQuery;
  return finalPath;
};

export const ValueToDeleteQueryKey = '914e4e5e-80c7-4779-be0b-e1036f2551d3';
