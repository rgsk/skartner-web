import { Button } from '@mui/material';
import Image from 'next/image';

interface IMyButtonProps {
  children: string;
  onClick?: () => void;
}
const MyButton: React.FC<IMyButtonProps> = ({ children, onClick }) => {
  return (
    <div>
      <p className="text-purple-500">this is some random text</p>
      <div className="border border-solid border-red-400 w-[100px] h-[100px] relative">
        <Image src="/Background.png" alt="ss" fill />
      </div>
      <Button onClick={onClick}>{children}</Button>
    </div>
  );
};
export default MyButton;
