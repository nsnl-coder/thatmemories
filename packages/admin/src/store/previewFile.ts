import { createSlice } from '@reduxjs/toolkit';

interface PreviewFile {
  isModalOpen: boolean;
  s3Key: string | undefined;
}

const initialState: PreviewFile = {
  isModalOpen: false,
  s3Key: undefined,
};

const previewFileSlice = createSlice({
  name: 'previewFile',
  initialState,
  reducers: {
    openPreviewFile: (state, { payload }: { payload: string }) => {
      state.isModalOpen = true;
      state.s3Key = payload;
    },
    closePreviewFile: (state) => {
      state.isModalOpen = false;
      state.s3Key = undefined;
    },
  },
});

const previewFileReducer = previewFileSlice.reducer;

export default previewFileReducer;
export const { openPreviewFile, closePreviewFile } = previewFileSlice.actions;
