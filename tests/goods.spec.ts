import path from 'path';
import { setup } from './helpers';
import { consumerStub } from './stubs/consumer.stub';
import { goodsStub } from './stubs/goods.stub';
import { producerStub } from './stubs/producer.stub';

describe('Goods', () => {
  const { autoinspector } = setup();

  describe('When create a goods inspection', () => {
    test('Then should create it', async () => {
      const response = await autoinspector.inspections.goods.create({
        goods: [goodsStub()[0]],
        consumer: consumerStub(),
        templateId: process.env.CI_GOODS_TEMPLATE_ID as string,
        initialStatus: 'started',
        producer: producerStub(),
        inputValues: [
          {
            label: 'FACTURA A',
            value: path.join(__dirname, 'assets', 'gopher.png'),
          },
        ],
      });

      expect(response).toEqual({
        inspectionId: expect.any(String),
        productIds: expect.any(Array),
        message: expect.any(String),
      });
    });
  });
});
