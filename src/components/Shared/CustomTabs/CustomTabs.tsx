import { Box } from '@mui/material';
import * as React from 'react';

import { Tab, Tabs } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface ICustomTabsProps {
  data: {
    label: string;
    component: JSX.Element;
  }[];
}
const CustomTabs: React.FC<ICustomTabsProps> = ({ data }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div style={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {data.map(({ label }, index) => {
            return <Tab key={index} label={label} {...a11yProps(index)} />;
          })}
        </Tabs>
      </Box>

      {data.map(({ component }, index) => {
        return (
          <TabPanel key={index} value={value} index={index}>
            {component}
          </TabPanel>
        );
      })}
    </div>
  );
};
export default CustomTabs;
