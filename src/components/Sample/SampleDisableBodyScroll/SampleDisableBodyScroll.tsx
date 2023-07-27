import useDisableBodyScroll from 'hooks/utils/useDisableBodyScroll';
import { useState } from 'react';
import SampleRandomContent from '../SampleRandomContent';

interface ISampleDisableBodyScrollProps {}
const SampleDisableBodyScroll: React.FC<
  ISampleDisableBodyScrollProps
> = ({}) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setShow((prev) => !prev);
        }}
      >
        {show ? 'hide' : 'show'}
      </button>
      {show && (
        <Modal
          onClose={() => {
            setShow(false);
          }}
        />
      )}
      <SampleRandomContent />
    </div>
  );
};
export default SampleDisableBodyScroll;

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  useDisableBodyScroll();

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50`}
      onClick={onClose}
    >
      <div className={`bg-white p-4 rounded-lg shadow-md`}>
        <h2 className="text-xl font-semibold mb-2">Modal Title</h2>
        <p className="mb-4">This is the modal content.</p>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close Modal
        </button>
      </div>
    </div>
  );
};
