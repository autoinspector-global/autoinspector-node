import { IInputValue } from '../types/inspection';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Helper } from '../resources/Helper';
import { IFilterInputValuesOutput } from '../types/helper';

export interface ITestTable<I = any, O = any> {
  context: string;
  output: O;
  input: I;
}

describe('Helper', () => {
  describe('filterInputValues', () => {
    const testTables: ITestTable<IInputValue[], IFilterInputValuesOutput>[] = [
      {
        context: 'when there is an input file as buffer, then should return it as buffer as well',
        input: [
          {
            label: 'Factura',
            value: readFileSync(join(__dirname, 'assets', 'gopher.png')),
          },
          {
            label: 'Tipo de poliza',
            value: 'POLIZA A',
          },
        ],
        output: {
          inputValuesFiles: [
            {
              label: 'Factura',
              value: expect.any(Buffer),
            },
          ],
          inputValuesNonFiles: [
            {
              label: 'Tipo de poliza',
              value: 'POLIZA A',
            },
          ],
        },
      },
      {
        context: 'when there is a file as path, then should return as buffer',
        input: [
          {
            label: 'Factura',
            value: join(__dirname, 'assets', 'gopher.png'),
          },
        ],
        output: {
          inputValuesFiles: [
            {
              label: 'Factura',
              value: expect.any(Buffer),
            },
          ],
          inputValuesNonFiles: [],
        },
      },
    ];

    testTables.forEach((test) => {
      it(test.context, async () => {
        const output = Helper.filterInputValues(test.input);

        expect(output).toEqual(test.output);
      });
    });
  });
});
