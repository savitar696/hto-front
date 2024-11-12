import compose from "compose-function";
import { withChakra } from "./with-chakra";
import { withQuery } from "./with-query";
import { withStore } from "./with-store";
import { withI18n } from "./with-i18n";

export const withProviders = compose(withChakra, withQuery, withStore, withI18n);
