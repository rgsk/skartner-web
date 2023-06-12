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
};
export default sampleResponses;
