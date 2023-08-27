import { XCircleIcon } from '@heroicons/react/solid';
import {AlertContainer, XButton, FlexContent } from './styles';

const Alert = ({ alert, handleClose }) => {
  if (alert && alert?.autoClose) {
    setTimeout(() => {
      handleClose();
    }, 6000);
  }

  return (
    <>
      {alert?.active && (
        <AlertContainer>
        <div x-data className="bg-sky-300 p-20 w-full rounded mb-8">
          <FlexContent>
            <div className="flex-1 leading-tight text-sm text-black font-medium">{alert.message}</div>
            <XButton>
              <XCircleIcon className="w-6 h-6 text-gray-600" onClick={handleClose} />
            </XButton>
          </FlexContent>
        </div>
        </AlertContainer>
      )}
    </>
  );
};

export default Alert;