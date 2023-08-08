import { CircularProgress } from '@mui/material';
import dynamic from 'next/dynamic';
import { useState } from 'react';

interface ISampleDynamicLoadingProps {}
const SampleDynamicLoading: React.FC<ISampleDynamicLoadingProps> = ({}) => {
  return (
    <div>
      <DynamicHello />
    </div>
  );
};

export default SampleDynamicLoading;

const DynamicHello = dynamic(() =>
  import('./Children/Hello').then((mod) => mod.Hello)
);

interface IConditionalRenderingNamedExportProps {}
const Ex1ConditionalRenderingNamedExport: React.FC<
  IConditionalRenderingNamedExportProps
> = ({}) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button
        onClick={() => {
          setShow(!show);
        }}
      >
        {show ? 'hide' : 'show'}
      </button>
      {show && <DynamicHello />}
    </div>
  );
};

const SampleComponent = dynamic(() => import('./Children/SampleComponent'), {
  loading: () => (
    <div>
      <CircularProgress size={24} />
    </div>
  ),
});

interface IConditionalRenderingDefaultProps {}
const Ex2ConditionalRenderingDefault: React.FC<
  IConditionalRenderingDefaultProps
> = ({}) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setShow(!show);
        }}
      >
        {show ? 'hide' : 'show'}
      </button>
      {show && <SampleComponent />}
    </div>
  );
};

const names = ['Tim', 'Joe', 'Bel', 'Lee'];

function Ex3ExternalLibrary() {
  const [results, setResults] = useState<any>();

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        onChange={async (e) => {
          const { value } = e.currentTarget;
          // Dynamically load fuse.js
          const Fuse = (await import('fuse.js')).default;
          const fuse = new Fuse(names);

          setResults(fuse.search(value));
        }}
      />
      <pre>Results: {JSON.stringify(results, null, 2)}</pre>
    </div>
  );
}

const DynamicNoSSRExample = dynamic(() => import('./Children/NoSSRExample'), {
  ssr: false,
});

interface IEx4NoSSRProps {}
const Ex4NoSSR: React.FC<IEx4NoSSRProps> = ({}) => {
  return (
    <div>
      <DynamicNoSSRExample />
    </div>
  );
};
