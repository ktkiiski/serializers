import type IndexValidationError from './IndexValidationError.js';
import type PropertyValidationError from './PropertyValidationError.js';

type KeyValidationErrorList = PropertyValidationError[] | IndexValidationError[];

export default KeyValidationErrorList;
