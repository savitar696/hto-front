import {
    useDispatch as useReduxDispatch,
    useSelector as useReduxSelector,
  } from "react-redux"

  export const useDispatch = useReduxDispatch.withTypes<AppDispatch>()
  export const useSelector = useReduxSelector.withTypes<RootState>()
