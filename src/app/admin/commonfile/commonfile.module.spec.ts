import { CommonfileModule } from './commonfile.module';

describe('CommonfileModule', () => {
  let commonfileModule: CommonfileModule;

  beforeEach(() => {
    commonfileModule = new CommonfileModule();
  });

  it('should create an instance', () => {
    expect(commonfileModule).toBeTruthy();
  });
});
