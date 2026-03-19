import { faker } from '@faker-js/faker';

export const userPassword = 's3cret';

export const getRandomUser = () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  return {
    firstName,
    lastName,
    username: faker.internet.username({ firstName, lastName }) + `_${Date.now()}`,
    password: userPassword,
  };
};

export const defaultBankData = {
  name: 'Global Bank',
  accountNumber: '123456789',
  routingNumber: '987654321',
};
