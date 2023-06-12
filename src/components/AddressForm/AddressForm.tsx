import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  TextField,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import apiService, { PostOffice } from 'api/apiService';
import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface FormInputs {
  pincode: string;
  postOffice: PostOffice | null;
  state: string;
  city: string;
  district: string;
}

const pincodeRegex = /^[1-9][0-9]{5}$/;

const isValidPincode = (pincode: string) => {
  return pincodeRegex.test(pincode);
};

const usePostOffices = ({ pincode }: { pincode: string }) => {
  const getPostOfficesQuery = useMemo(() => {
    return isValidPincode(pincode)
      ? apiService.getPostOffices({ pincode: pincode })
      : undefined;
  }, [pincode]);

  const getPostOfficesQueryResult = useQuery({
    queryKey: getPostOfficesQuery?.key,
    queryFn: getPostOfficesQuery?.fn,
    enabled: !!getPostOfficesQuery,
  });
  const postOffices = useMemo(
    () => getPostOfficesQueryResult.data?.[0].PostOffice,
    [getPostOfficesQueryResult.data]
  );
  return {
    postOffices,
    loading: getPostOfficesQueryResult.isFetching && !postOffices,
  };
};

interface IAddressFormProps {}
const AddressForm: React.FC<IAddressFormProps> = ({}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormInputs>({ defaultValues: { pincode: '', postOffice: null } });

  const pincode = watch('pincode');
  const { postOffices, loading: postOfficesLoading } = usePostOffices({
    pincode,
  });

  useEffect(() => {
    const [] = [pincode];
    setValue('postOffice', null);
  }, [pincode, setValue]);

  const handleFormSubmit = async (formData: FormInputs) => {
    console.log(formData);
  };
  return (
    <Box sx={{ p: 2 }}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Box>
          <Controller
            name="pincode"
            control={control}
            rules={{
              required: 'Please enter a ZIP or postal code.',
              pattern: {
                value: pincodeRegex,
                message: 'Please enter a valid ZIP or postal code.',
              },
            }}
            render={({ field }) => (
              <TextField
                label="Pincode"
                error={!!errors.pincode}
                helperText={errors.pincode?.message}
                {...field}
              />
            )}
          />
        </Box>
        <Box>
          <Controller
            control={control}
            name="postOffice"
            rules={{
              required: 'Please select the Post Office',
            }}
            render={({ field }) => {
              return (
                <Autocomplete
                  options={postOffices ?? []}
                  getOptionLabel={(option) => option.Name}
                  disabled={!postOffices}
                  renderInput={(params) => (
                    <TextField
                      label="Post Office"
                      error={!!errors.postOffice}
                      helperText={errors.postOffice?.message}
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {postOfficesLoading && (
                              <CircularProgress size={20} />
                            )}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                  {...field}
                  onChange={(event, item) => {
                    field.onChange(item);
                  }}
                />
              );
            }}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button type="submit">Save</Button>
        </Box>
      </form>
    </Box>
  );
};
export default AddressForm;
