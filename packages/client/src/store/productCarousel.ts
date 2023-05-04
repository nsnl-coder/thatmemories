import { createSlice } from '@reduxjs/toolkit';
import { IVariant } from '@src/yup/productSchema';

interface ProductCarouselState {
  currentImgIndex: number;
  carouselImages: string[];
}

const initialState: ProductCarouselState = {
  currentImgIndex: 0,
  carouselImages: [],
};

interface SetCarouselImagesPayload {
  payload: {
    productImages: string[];
    variants: IVariant[] | undefined;
  };
}

const productCarouselSlice = createSlice({
  name: 'productCarousel',
  initialState,
  reducers: {
    resetProductCarousel(state) {
      state.currentImgIndex = 0;
      state.carouselImages = [];
    },
    setCurrentImageIndex(state, { payload }: { payload: number }) {
      state.currentImgIndex = payload;
    },
    setCarouselImages(state, action: SetCarouselImagesPayload) {
      const productImages = action.payload.productImages;
      const variants = action.payload.variants;
      const optionsImages: string[] = [];

      if (variants) {
        variants.forEach((variant) => {
          variant.options.forEach((option) => {
            if (option.photo) {
              optionsImages.push(option.photo);
            }
          });
        });
      }

      state.carouselImages = [...productImages, ...optionsImages];
      state.currentImgIndex = 0;
    },
    changeCurrentCarouselImage(state, { payload }: { payload: string }) {
      const imgLink = payload;
      const newIndex = state.carouselImages.findIndex(
        (link) => link === imgLink,
      );

      if (newIndex === -1) return state;
      state.currentImgIndex = newIndex;
    },
  },
});

const productCarouselReducer = productCarouselSlice.reducer;

export default productCarouselReducer;

export const {
  resetProductCarousel,
  setCarouselImages,
  setCurrentImageIndex,
  changeCurrentCarouselImage,
} = productCarouselSlice.actions;
