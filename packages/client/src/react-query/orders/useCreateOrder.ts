import axios from '@src/config/axios';
import { useAppSelector } from '@src/hooks/redux';
import { openErrorModal } from '@src/store/notifyModals';
import { HttpError, HttpResponse } from '@src/types/http';
import { useMutation } from '@tanstack/react-query';
import {
  CreateOrderPayload,
  IOrder,
  createOrderSchema,
} from '@thatmemories/yup';
import { useDispatch } from 'react-redux';
import { withDefaultOnError } from '../queryClient';

type Response = HttpResponse<{
  client_secret: string;
  order: IOrder;
}>;

const useCreateOrder = () => {
  const dispatch = useDispatch();
  const cart = useAppSelector((state) => state.cart);
  const email = useAppSelector((state) => state.auth?.user?.email);

  const newOrder: CreateOrderPayload = {
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
    shippingMethod: cart.shippingMethod || '',
    grandTotal: cart.grandTotal,
    couponCode: cart.cartCoupon.couponCode,
  };

  const mutationFn = async (payload: CreateOrderPayload) => {
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
    const order: CreateOrderPayload = await createOrderSchema.validate(
      newOrder,
      { stripUnknown: true },
    );
    mutation.mutate(order);
  };

  const mutation = useMutation<Response, HttpError, CreateOrderPayload>({
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
