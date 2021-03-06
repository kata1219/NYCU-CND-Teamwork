const { natsMessageHandler } = require('../messageUtil');
const message = require('config');

describe('Module messageUtil', () => {
  const fakeType = 'FACTOR_THICKNESS';
  const fakeFactor = message.fakeFactor;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Method natsMessageHandler for success', async () => {
    global.cache = {
      set: jest.fn().mockReturnValueOnce(true),
    };

    natsMessageHandler(
      JSON.stringify({
        type: fakeType,
        factor: fakeFactor,
      })
    );

    expect(global.cache.set).toHaveBeenCalledWith(fakeType, fakeFactor);
  });

  it('Method natsMessageHandler for failed', async () => {
    global.cache = {
      set: jest.fn().mockReturnValueOnce(true),
    };

    natsMessageHandler(
      JSON.stringify({
        type: 'FAKE_TYPE',
        factor: fakeFactor,
      })
    );

    expect(global.cache.set).toBeCalledTimes(0);
  });
});
