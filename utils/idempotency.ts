const { v4: uuidv4 } = require('uuid');

export const generateIdempotencyHeader = () => {
  return {
    'Idempotency-Key': uuidv4(),
  };
};
