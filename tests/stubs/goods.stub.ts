import { IGood } from '../../types/goods';

export const goodsStub = (): IGood[] => {
  return [
    {
      category: 'electronics',
      type: 'camera',
      make: 'GO PRO',
      model: 'PRO',
      price: '14400',
      serialNumber: 'A23r',
    },
    {
      category: 'home',
      type: 'tv',
      make: 'LG',
      model: 'LKT',
      price: '2345',
      serialNumber: 'ASW23',
    },
  ];
};
