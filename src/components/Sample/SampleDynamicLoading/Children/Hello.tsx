interface IHelloProps {}
export const Hello: React.FC<IHelloProps> = ({}) => {
  return (
    <div>
      <p>Hello</p>
      {/* <SampleHeavyComponent /> */}
    </div>
  );
};
