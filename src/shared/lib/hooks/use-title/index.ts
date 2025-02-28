import { config } from "@shared/config";

type IProps = {
  text: string;
};

export function useTitle() {
  const initialTitle = document.title;
  const WEB_TITLE = config.title;

  const set = ({ text }: IProps): void => {
    if (!text) return;
    document.title = `${text} ${WEB_TITLE}`;
  };

  const get = (): string => document.title;

  const reset = (): void => {
    document.title = WEB_TITLE;
  };

  const append = ({ text }: { text: string }): void => {
    if (!text) return;
    document.title = `${document.title} | ${text}`;
  };

  const prepend = ({ text }: IProps): void => {
    if (!text) return;
    document.title = `${text} | ${document.title}`;
  };

  const toggle = (text1: string, text2: string): void => {
    document.title = document.title === text1 ? text2 : text1;
  };

  const restore = (): void => {
    document.title = initialTitle;
  };

  return {
    set,
    get,
    reset,
    append,
    prepend,
    toggle,
    restore,
  };
}
