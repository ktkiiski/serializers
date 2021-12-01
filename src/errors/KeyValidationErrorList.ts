import type IndexValidationError from './IndexValidationError';
import type PropertyValidationError from './PropertyValidationError';

type KeyValidationErrorList = PropertyValidationError[] | IndexValidationError[];

export default KeyValidationErrorList;
