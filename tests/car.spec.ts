import path from 'path';
import { setup } from './helpers';
import { carStub } from './stubs/car.stub';
import { consumerStub } from './stubs/consumer.stub';
import { producerStub } from './stubs/producer.stub';

describe('Car', () => {
  const { autoinspector } = setup();

  describe('When create a car inspection', () => {
    test('Then should create it', async () => {
      const response = await autoinspector.inspections.car.create({
        car: carStub(),
        consumer: consumerStub(),
        templateId: process.env.CI_CAR_TEMPLATE_ID as string,
        producer: producerStub(),
        inputValues: [
          {
            label: 'ARCHIVO 1',
            value: path.join(__dirname, 'assets', 'gopher.png'),
          },
        ],
      });

      expect(response).toEqual({
        inspectionId: expect.any(String),
        productId: expect.any(String),
        message: expect.any(String),
      });
    });
  });

  describe('When update a car inspection', () => {
    test('Then should update it', async () => {
      const { productId } = await autoinspector.inspections.car.create({
        templateId: process.env.CI_CAR_TEMPLATE_ID as string,
        initialStatus: 'started',
        car: carStub(),
        consumer: consumerStub(),
        producer: producerStub(),
        inputValues: [
          {
            label: 'ARCHIVO 1',
            value: path.join(__dirname, 'assets', 'gopher.png'),
          },
        ],
      });

      const response = await autoinspector.inspections.car.update({
        car: {
          color: 'black',
          make: 'JEEP',
          model: 'RENEGADE',
        },
        productId,
        consumer: {
          email: 'lucianoalvarez1212@gmail.com',
        },
        inputValues: [
          {
            label: 'TIPO DE POLIZA',
            value: 'POLIZA A',
          },
        ],
      });

      expect(response).toEqual({ message: expect.any(String) });
    });
  });
});
