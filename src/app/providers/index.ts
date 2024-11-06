import compose from 'compose-function'
import { withChakra } from "./with-chakra";
import { withQuery } from './with-query';

export const withProviders = compose(
    withChakra,
    withQuery
)
