interface IRenderObjectProps {
  obj: Record<string, any>;
}
const RenderObject: React.FC<IRenderObjectProps> = ({ obj }) => {
  return (
    <div>
      {Object.entries(obj).map(([key, value]) => (
        <div key={key} className="flex space-x-3">
          <p>{key}</p>
          <p>:</p>
          <p>{JSON.stringify(value, null, 2)}</p>
        </div>
      ))}
    </div>
  );
};
export default RenderObject;
