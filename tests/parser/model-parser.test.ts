import ModelParser from '../../src/parser/model-parser';
import { ModelParserErrors } from '../../src/utils';

describe('Throw exception tests', () => {
  const modelTest = new ModelParser();
  test('missing model', () => {
    const configObject: any = {};
    expect(() => {
      modelTest.validate(configObject);
    }).toThrow(ModelParserErrors.NO_MODEL);
  });
  test('associations type wrong', () => {
    const configObject: any = {};
    configObject.model = { tables: {} };
    configObject.model.associations = [1, 2];
    expect(() => {
      modelTest.validate(configObject);
    }).toThrowError(ModelParserErrors.ASSOC_AS_ARRAY);
  });

  test('association source is not in table', () => {
    const configObject = {
      model: { tables: {}, associations: { user: {} } },
    };
    expect(() => {
      modelTest.validate(configObject);
    }).toThrowError(ModelParserErrors.NO_SRC_IN_TABLES);
  });
  test('relation not supported', () => {
    const configObject = {
      model: {
        associations: { user: { '1-->n': 'test' } },
        tables: { user: {} },
      },
    };
    expect(() => {
      modelTest.validate(configObject);
    }).toThrow(ModelParserErrors.WRONG_RELATION);
  });
  test('target is not an array', () => {
    const configObject = {
      model: {
        associations: { user: { '1->n': 'test' } },
        tables: { user: {} },
      },
    };
    expect(() => {
      modelTest.validate(configObject);
    }).toThrow(ModelParserErrors.TARGET_NOT_ARRAY);
  });
  test('target is not in table', () => {
    const configObject = {
      model: {
        associations: { user: { '1->n': ['user', 'test'] } },
        tables: { user: {} },
      },
    };
    expect(() => {
      modelTest.validate(configObject);
    }).toThrow(ModelParserErrors.NO_TRG_IN_TABLES);
  });
});