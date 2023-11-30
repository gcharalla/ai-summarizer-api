import { faker } from '@faker-js/faker';
import { SummaryResult } from '../types/types';

const createSummary = (): SummaryResult => ({
  summary: faker.lorem.paragraphs(5),
})

export default createSummary;