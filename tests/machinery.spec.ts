import path from 'path';
import { setup } from './helpers';
import { consumerStub } from './stubs/consumer.stub';
import { machineryStub } from './stubs/machinery.stub';
import { producerStub } from './stubs/producer.stub';

describe('Machinery', () => {
  const { autoinspector } = setup();

  describe('When create a machinery inspection', () => {
    test('Then should create it', async () => {
      const response = await autoinspector.inspections.machinery.create({
        machinery: machineryStub(),
        consumer: consumerStub(),
        templateId: process.env.CI_MACHINERY_TEMPLATE_ID as string,
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

  describe('When update a machinery inspection', () => {
    test('Then should update it', async () => {
      const { productId } = await autoinspector.inspections.machinery.create({
        templateId: process.env.CI_MACHINERY_TEMPLATE_ID as string,
        initialStatus: 'started',
        machinery: machineryStub(),
        consumer: consumerStub(),
        producer: producerStub(),
        inputValues: [
          {
            label: 'ARCHIVO 1',
            value: path.join(__dirname, 'assets', 'gopher.png'),
          },
        ],
      });

      const response = await autoinspector.inspections.machinery.update({
        machinery: {
          purpose: 'Agrícola',
          year: 2019,
          make: 'JOHN DEERE',
          model: 'V2',
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
