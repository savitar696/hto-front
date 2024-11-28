import compose from "compose-function";
import { withChakra } from "./with-chakra";
import { withQuery } from "./with-query";
import { withI18n } from "./with-i18n";

export const withProviders = compose(withChakra, withQuery, withI18n);
