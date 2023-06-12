import { endpoints } from './apiService';

const sampleResponses = {
  getPostOffices: [
    {
      endpoint: endpoints['pincode/:pincode']({ pincode: '201301' }),
      response: [
        {
          Message: 'Number of pincode(s) found:4',
          Status: 'Success',
          PostOffice: [
            {
              Name: 'Noida',
              Description: null,
              BranchType: 'Head Post Office',
              DeliveryStatus: 'Delivery',
              Circle: 'Uttar Pradesh',
              District: 'Gautam Buddha Nagar',
              Division: 'Ghaziabad',
              Region: 'Lucknow  HQ',
              Block: 'Noida',
              State: 'Uttar Pradesh',
              Country: 'India',
              Pincode: '201301',
            },
            {
              Name: 'Noida Sector 12',
              Description: null,
              BranchType: 'Sub Post Office',
              DeliveryStatus: 'Non-Delivery',
              Circle: 'Uttar Pradesh',
              District: 'Gautam Buddha Nagar',
              Division: 'Ghaziabad',
              Region: 'Lucknow  HQ',
              Block: 'Noida',
              State: 'Uttar Pradesh',
              Country: 'India',
              Pincode: '201301',
            },
            {
              Name: 'Noida Sector 16',
              Description: null,
              BranchType: 'Sub Post Office',
              DeliveryStatus: 'Non-Delivery',
              Circle: 'Uttar Pradesh',
              District: 'Gautam Buddha Nagar',
              Division: 'Ghaziabad',
              Region: 'Lucknow  HQ',
              Block: 'Noida',
              State: 'Uttar Pradesh',
              Country: 'India',
              Pincode: '201301',
            },
            {
              Name: 'Noida Sector 27',
              Description: null,
              BranchType: 'Sub Post Office',
              DeliveryStatus: 'Non-Delivery',
              Circle: 'Uttar Pradesh',
              District: 'Ghaziabad',
              Division: 'Ghaziabad',
              Region: 'Lucknow  HQ',
              Block: 'Noida',
              State: 'Uttar Pradesh',
              Country: 'India',
              Pincode: '201301',
            },
          ],
        },
      ],
    },
  ],
  getPlaceSuggestions: [
    {
      endpoint: endpoints['places']({ input: 'sector', pincode: '160022' }),
      response: {
        predictions: [
          {
            description: 'Sector 22, Chandigarh, India',
            matched_substrings: [
              {
                length: 6,
                offset: 0,
              },
            ],
            place_id: 'ChIJyX75_6TtDzkRlUod8cpcfSE',
            reference: 'ChIJyX75_6TtDzkRlUod8cpcfSE',
            structured_formatting: {
              main_text: 'Sector 22',
              main_text_matched_substrings: [
                {
                  length: 6,
                  offset: 0,
                },
              ],
              secondary_text: 'Chandigarh, India',
            },
            terms: [
              {
                offset: 0,
                value: 'Sector 22',
              },
              {
                offset: 11,
                value: 'Chandigarh',
              },
              {
                offset: 23,
                value: 'India',
              },
            ],
            types: [
              'sublocality_level_1',
              'sublocality',
              'political',
              'geocode',
            ],
          },
          {
            description: 'Sector 35, Chandigarh, India',
            matched_substrings: [
              {
                length: 6,
                offset: 0,
              },
            ],
            place_id: 'ChIJ20Lj_7btDzkRDUxnjCNJPNU',
            reference: 'ChIJ20Lj_7btDzkRDUxnjCNJPNU',
            structured_formatting: {
              main_text: 'Sector 35',
              main_text_matched_substrings: [
                {
                  length: 6,
                  offset: 0,
                },
              ],
              secondary_text: 'Chandigarh, India',
            },
            terms: [
              {
                offset: 0,
                value: 'Sector 35',
              },
              {
                offset: 11,
                value: 'Chandigarh',
              },
              {
                offset: 23,
                value: 'India',
              },
            ],
            types: [
              'sublocality_level_1',
              'sublocality',
              'political',
              'geocode',
            ],
          },
          {
            description: 'Sector 34, Chandigarh, India',
            matched_substrings: [
              {
                length: 6,
                offset: 0,
              },
            ],
            place_id: 'ChIJqdCOHrPtDzkRcUBfAxoAQYE',
            reference: 'ChIJqdCOHrPtDzkRcUBfAxoAQYE',
            structured_formatting: {
              main_text: 'Sector 34',
              main_text_matched_substrings: [
                {
                  length: 6,
                  offset: 0,
                },
              ],
              secondary_text: 'Chandigarh, India',
            },
            terms: [
              {
                offset: 0,
                value: 'Sector 34',
              },
              {
                offset: 11,
                value: 'Chandigarh',
              },
              {
                offset: 23,
                value: 'India',
              },
            ],
            types: [
              'sublocality_level_1',
              'sublocality',
              'political',
              'geocode',
            ],
          },
          {
            description:
              'Sector 22 Market Road, Sector 22B, Sector 22, Chandigarh, India',
            matched_substrings: [
              {
                length: 6,
                offset: 0,
              },
            ],
            place_id:
              'Ej9TZWN0b3IgMjIgTWFya2V0IFJvYWQsIFNlY3RvciAyMkIsIFNlY3RvciAyMiwgQ2hhbmRpZ2FyaCwgSW5kaWEiLiosChQKEgk5foJVpO0POREcJfFC2ztGWRIUChIJTeekiqbtDzkRXeGI8bDZFfs',
            reference:
              'Ej9TZWN0b3IgMjIgTWFya2V0IFJvYWQsIFNlY3RvciAyMkIsIFNlY3RvciAyMiwgQ2hhbmRpZ2FyaCwgSW5kaWEiLiosChQKEgk5foJVpO0POREcJfFC2ztGWRIUChIJTeekiqbtDzkRXeGI8bDZFfs',
            structured_formatting: {
              main_text: 'Sector 22 Market Road',
              main_text_matched_substrings: [
                {
                  length: 6,
                  offset: 0,
                },
              ],
              secondary_text: 'Sector 22B, Sector 22, Chandigarh, India',
            },
            terms: [
              {
                offset: 0,
                value: 'Sector 22 Market Road',
              },
              {
                offset: 23,
                value: 'Sector 22B',
              },
              {
                offset: 35,
                value: 'Sector 22',
              },
              {
                offset: 46,
                value: 'Chandigarh',
              },
              {
                offset: 58,
                value: 'India',
              },
            ],
            types: ['route', 'geocode'],
          },
          {
            description: 'Sector 34A, Sector 34, Chandigarh, India',
            matched_substrings: [
              {
                length: 6,
                offset: 0,
              },
            ],
            place_id: 'ChIJ84Zl2rTtDzkRSNdak4YTirg',
            reference: 'ChIJ84Zl2rTtDzkRSNdak4YTirg',
            structured_formatting: {
              main_text: 'Sector 34A, Sector 34',
              main_text_matched_substrings: [
                {
                  length: 6,
                  offset: 0,
                },
              ],
              secondary_text: 'Chandigarh, India',
            },
            terms: [
              {
                offset: 0,
                value: 'Sector 34A',
              },
              {
                offset: 12,
                value: 'Sector 34',
              },
              {
                offset: 23,
                value: 'Chandigarh',
              },
              {
                offset: 35,
                value: 'India',
              },
            ],
            types: [
              'sublocality_level_2',
              'sublocality',
              'political',
              'geocode',
            ],
          },
        ],
        status: 'OK',
      },
    },
  ],
};
export default sampleResponses;
