interface INoSSRExampleProps {}
const NoSSRExample: React.FC<INoSSRExampleProps> = ({}) => {
  return <div>{window.location.href}</div>;
};
export default NoSSRExample;
