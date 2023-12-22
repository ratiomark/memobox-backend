import { APP_URL } from 'test/utils/constants';
import cardsRetrieveTests from './01-cards-training-retrieve.case';
import cardsTrainingResponsesTests from './02-cards-training-responses.case';
cardsRetrieveTests();
cardsTrainingResponsesTests();
console.log('cards.test.ts');
console.log(process.env.NODE_ENV);
console.log(APP_URL);
