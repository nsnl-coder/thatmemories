import useHandleSuccessPayment from '@src/hooks/useHandleSuccessPayment';
import useManageCart from '@src/hooks/useManageCart';
import useGetCurrentUser from '@src/react-query/auth/useGetCurrentUser';

function HooksContainer(): null {
  useGetCurrentUser();
  useManageCart();
  useHandleSuccessPayment();

  return null;
}

export default HooksContainer;
