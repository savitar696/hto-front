import {
  CheckIcon,
  CloseIcon,
  PremiumBackgroundGradient,
} from "@shared/ui/icons/Icons"

export const subscribeToast = {
  duration: 5000,
  className: "",
  style: {
    padding: "var(--space-4)",
    backgroundColor: "var(--black100)",
    color: "var(--white100)",
    borderRadius: "var(--radii-4)",
    display: "flex",
    gap: "var(--space-1)",
    width: "300px",
  },
  icon: <PremiumBackgroundGradient width={24} height={24} />,
}

export const successToast = {
  duration: 5000,
  className: "",
  style: {
    justifyContent: "flex-start !important",
    padding: "var(--space-4)",
    backgroundColor: "var(--black100)",
    color: "var(--white100)",
    borderRadius: "var(--radii-4)",
    display: "flex",
    gap: "var(--space-1)",
    width: "300px",
  },
  icon: <CheckIcon width={24} height={24} />,
}

export const errorToast = {
  duration: 5000,
  className: "",
  style: {
    justifyContent: "flex-start !important",
    padding: "var(--space-4)",
    backgroundColor: "var(--black100)",
    color: "var(--white100)",
    borderRadius: "var(--radii-4)",
    display: "flex",
    gap: "var(--space-1)",
    width: "300px",
  },
  icon: <CloseIcon width={24} height={24} />,
}

export const loadingToast = {
  className: "",
  style: {
    padding: "var(--space-4)",
    backgroundColor: "var(--black100)",
    color: "var(--white100)",
    borderRadius: "var(--radii-4)",
    display: "flex",
    gap: "var(--space-1)",
    width: "300px",
    justifyContent: "flex-start !important",
  },
}
