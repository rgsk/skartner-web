import { Button } from '@mui/material';

interface IMyButtonProps {
  children: string;
  onClick?: () => void;
}
const MyButton: React.FC<IMyButtonProps> = ({ children, onClick }) => {
  return (
    <div>
      <p className="text-purple-500">this is some random text</p>
      <Button onClick={onClick}>{children}</Button>
    </div>
  );
};
export default MyButton;
