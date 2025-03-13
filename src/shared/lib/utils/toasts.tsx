import toast from "react-hot-toast"
import { errorToast, loadingToast, successToast } from "./theme"

export const promiseToast = (
  promise: Promise<any>,
  success: { title: string; subTitle?: string },
  error: { title: string; subTitle?: string },
  loading: { title: string; subTitle?: string },
) => {
  toast.promise(
    promise,
    {
      loading: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-1)",
          }}
        >
          <span
            style={{
              color: "var(--white100)",
              fontWeight: "var(--fontWeights-semibold)",
            }}
          >
            {loading.title}
          </span>
        </div>
      ),
      success: () => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-1)",
          }}
        >
          <span
            style={{
              color: "var(--white100)",
              fontWeight: "var(--fontWeights-semibold)",
            }}
          >
            {success.title}
          </span>
          <span
            style={{
              color: "var(--white60)",
              fontWeight: "var(--fontWeights-medium)",
              fontSize: "var(--fontSizes-0)",
            }}
          >
            {success.subTitle}!
          </span>
        </div>
      ),
      error: () => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-1)",
          }}
        >
          <span
            style={{
              color: "var(--white100)",
              fontWeight: "var(--fontWeights-semibold)",
            }}
          >
            {error.title}
          </span>
          <span
            style={{
              color: "var(--white60)",
              fontWeight: "var(--fontWeights-medium)",
              fontSize: "var(--fontSizes-0)",
            }}
          >
            {error.subTitle}
          </span>
        </div>
      ),
    },
    {
      style: {
        minWidth: "250px",
      },
      success: successToast,
      error: errorToast,
      loading: loadingToast,
    },
  )
}
