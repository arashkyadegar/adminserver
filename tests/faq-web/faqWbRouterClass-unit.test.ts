import { FaqWbBusConc } from "../../app/faqWeb/faqWbBus";
import { FaqWbDalConc } from "../../app/faqWeb/faqWbDal";
import { FaqWbRouterClass } from "../../app/faqWeb/faqWbRouterClass";

describe('testing faqWeb', () => {
  test('findAll should result in []', async () => {
    const bus = new FaqWbBusConc(new FaqWbDalConc());
    const mReq = {}
    const mockResponse = ['sss', 'sss'];

    bus.findAll = jest.fn().mockResolvedValue(mockResponse);
    const router = new FaqWbRouterClass(bus);
    const mRes = {
      status: jest.fn().mockReturnValue(200),
      send: jest.fn()
    };

    // const mReq = {};

    //act
    const response = await router.findAll(mReq, mRes, (e: any) => { console.log(e) });
    expect(response).toHaveProperty('status', 200)
  });
});