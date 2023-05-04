import axios from '@src/config/axios';
import { useAppDispatch } from '@src/hooks/redux';
import {
  addCouponCode,
  recalculateCart,
  removeCouponCode,
} from '@src/store/cart';
import { HttpError, HttpResponse } from '@src/types/http';
import { useMutation } from '@tanstack/react-query';
import { ICoupon } from '@thatmemories/yup';
import { withDefaultOnError } from '../queryClient';

interface RequestData {
  couponCode: string;
  orderTotal: number;
}

type Response = HttpResponse<ICoupon>;

const useCheckCouponValidity = () => {
  const dispatch = useAppDispatch();

  const mutationFn = async (payload: RequestData) => {
    const { data } = await axios<Response>({
      method: 'post',
      url: '/api/coupons/check-coupon-validity',
      data: payload,
    });

    return data;
  };

  const onSuccess = (res: HttpResponse<ICoupon>) => {
    if (res.data) {
      dispatch(addCouponCode(res.data));
      dispatch(recalculateCart());
    }
  };
  const onError = (error: HttpError) => {
    dispatch(removeCouponCode());
    dispatch(recalculateCart());
  };

  const mutation = useMutation<Response, HttpError, RequestData>({
    mutationFn,
    onError: withDefaultOnError(onError),
    onSuccess,
  });

  const checkCouponValidity = (payload: RequestData) => {
    mutation.mutate(payload);
  };

  return {
    isLoading: mutation.isLoading,
    checkCouponValidity,
    errorMessage: mutation.error?.response?.data?.message,
    reset: mutation.reset,
    isSuccess: mutation.isSuccess,
    coupon: mutation.data?.data,
  };
};

export default useCheckCouponValidity;
