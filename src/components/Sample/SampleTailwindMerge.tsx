import { cn } from 'lib/generalUtils';
interface ISampleTailwindMergeProps {}
const SampleTailwindMerge: React.FC<ISampleTailwindMergeProps> = ({}) => {
  return (
    <div className="p-5">
      {/*
            Since, we are using tailwindMerge, 
            p-10 overrides even specific properties like px-8 and py-4
        */}
      <Button className="p-10 bg-green-400">Click Me!</Button>
    </div>
  );
};
export default SampleTailwindMerge;

interface IButtonProps {
  children: any;
  className?: string;
}
const Button: React.FC<IButtonProps> = ({ children, className }) => {
  return (
    <button className={cn('bg-red-400 px-8 py-4', className)}>
      {children}
    </button>
  );
};
