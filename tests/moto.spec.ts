import path from 'path';
import { setup } from './helpers';
import { consumerStub } from './stubs/consumer.stub';
import { motoStub } from './stubs/moto.stub';
import { producerStub } from './stubs/producer.stub';

describe('Moto', () => {
  const { autoinspector } = setup();

  describe('When create a moto inspection', () => {
    test('Then should create it', async () => {
      const response = await autoinspector.inspections.moto.create({
        moto: motoStub(),
        consumer: consumerStub(),
        templateId: process.env.CI_MOTO_TEMPLATE_ID as string,
        producer: producerStub(),
        inputs: [
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

  describe('When update a moto inspection', () => {
    test('Then should update it', async () => {
      const { productId } = await autoinspector.inspections.moto.create({
        templateId: process.env.CI_MOTO_TEMPLATE_ID as string,
        initialStatus: 'started',
        moto: motoStub(),
        consumer: consumerStub(),
        producer: producerStub(),
        inputs: [
          {
            label: 'ARCHIVO 1',
            value: path.join(__dirname, 'assets', 'gopher.png'),
          },
        ],
      });

      const response = await autoinspector.inspections.moto.update({
        moto: {
          color: 'black',
          make: 'JEEP',
          model: 'RENEGADE',
        },
        productId,
        consumer: {
          email: 'lucianoalvarez1212@gmail.com',
        },
        inputs: [
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
