import { setup } from './helpers';

describe('Template', () => {
  const { autoinspector } = setup();

  describe('When list templates without passing inspection type', () => {
    test('Then should list all templates', async () => {
      const templates = await autoinspector.templates.list();

      expect(templates).toBeDefined();
      expect(templates.length).toBeGreaterThan(0);

      const inspectionTypes = ['goods', 'people', 'machinery', 'car', 'moto'];

      const areAllInspectionTypesIncluded = inspectionTypes.every((inspectionType) =>
        templates.some((template) => template.inspectionType === inspectionType)
      );

      expect(areAllInspectionTypesIncluded).toBeTruthy();
    });
  });

  describe('When list templates passing a specific inspection type', () => {
    test('Then should return templates with that inspection type', async () => {
      const inspectionType = 'car';

      const templates = await autoinspector.templates.list({
        inspectionType,
      });

      expect(templates.length).toBeGreaterThan(0);
      expect(templates.every((template) => template.inspectionType === inspectionType));
    });
  });
});
