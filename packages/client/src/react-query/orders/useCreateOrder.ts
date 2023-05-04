import axios from '@src/config/axios';
import { useAppSelector } from '@src/hooks/redux';
import { openErrorModal } from '@src/store/notifyModals';
import { HttpError, HttpResponse } from '@src/types/http';
import orderSchema, { IOrder } from '@src/yup/orderSchema';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { withDefaultOnError } from '../queryClient';

type Response = HttpResponse<{
  client_secret: string;
  order: IOrder;
}>;

type RequestPayload = IOrder;

const useCreateOrder = () => {
  const dispatch = useDispatch();
  const cart = useAppSelector((state) => state.cart);
  const email = useAppSelector((state) => state.auth?.user?.email);

  const newOrder: RequestPayload = {
    items: cart.items.map((item) => ({
      ...item,
      product: item._id,
      quantity: item.quantity || 1,
      selectedOptions: item.selectedOptions.map((o) => o._id),
    })),
    shippingAddress: cart.shippingAddress,
    fullname: cart.fullname,
    phone: cart.phone,
    email,
    shippingMethod: cart.shippingMethod,
    grandTotal: cart.grandTotal,
    couponCode: cart.cartCoupon.couponCode,
  };

  const mutationFn = async (payload: RequestPayload) => {
    const { data } = await axios<Response>({
      url: '/api/orders',
      method: 'post',
      data: payload,
    });

    return data;
  };

  const onSuccess = () => {};
  const onError = (error: HttpError) => {
    if (
      error.response?.data?.message ===
      'Received grandTotal and calculated grandTotal are not the same'
    ) {
      dispatch(
        openErrorModal({
          message:
            'There is mismatch between client price and server price. Try to refresh browser to get newly updated price. Please contact us if error persisted.',
        }),
      );
    }
  };

  const createOrder = async () => {
    const order = await orderSchema.validate(newOrder, { stripUnknown: true });
    mutation.mutate(order);
  };

  const mutation = useMutation<Response, HttpError, IOrder>({
    mutationFn,
    onError: withDefaultOnError(onError),
    onSuccess,
  });

  return {
    isLoading: mutation.isLoading,
    createOrder,
    order: mutation.data?.data,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
};

export default useCreateOrder;
