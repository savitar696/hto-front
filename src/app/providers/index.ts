import compose from "compose-function";
import { withChakra } from "./with-chakra";
import { withQuery } from "./with-query";
import { withStore } from "./with-store";

export const withProviders = compose(withChakra, withQuery, withStore);
