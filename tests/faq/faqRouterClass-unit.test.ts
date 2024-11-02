import { FaqBusConc } from "../../app/faq/faqBus";
import { FaqDalConc } from "../../app/faq/faqDal";
import { FaqRouterClass } from "../../app/faq/faqRouterClass";

describe('faqRouterClass', () => {
  describe("findAll", function () {
    test('1-findAll should result in [] when no page query is sent', async () => {
      const mReq = { query: {} }
      const mockResponse = ['sss', 'sss'];
      const bus = new FaqBusConc(new FaqDalConc());
      bus.findAll = jest.fn().mockResolvedValue(mockResponse);
      const router = new FaqRouterClass(bus);
      const mRes = {
        status: jest.fn().mockReturnValue(200),
        send: jest.fn()
      };

      // const mReq = {};
      //act
      const response = await router.findAll(mReq, mRes, (e: any) => { console.log(e) });
      expect(response).toHaveProperty('status', 200)
    });
    test('2-findAll should result with properties rows,totalCount,page when  page query provided', async () => {
      const mRes = {
        status: jest.fn().mockReturnValue(200),
        send: jest.fn()
      };

      // const mReq = {};
      const mReq = { query: { page: 1 } }
      const mockResponse = { rows: [], totalCount: 1, page: 1 };
      const bus = new FaqBusConc(new FaqDalConc());
      bus.findAllByPages = jest.fn().mockReturnValue(mockResponse);
      bus.findAll = jest.fn().mockReturnValue([]);
      const router = new FaqRouterClass(bus);

      //act
      const response = await router.findAll(mReq, mRes, (e: any) => { console.log(e) });
      expect(response)
        .toEqual(expect.objectContaining({
          message: expect.objectContaining({ rows: [] })
        }))
    });
  })
  describe("findOne", function () {
    test('1-findOne should fail if id is not provided', async () => {
      const mockResponse = { rows: [], totalCount: 1, page: 1 };
      const bus = new FaqBusConc(new FaqDalConc());
      bus.findOne = jest.fn().mockReturnValue(mockResponse);
      const router = new FaqRouterClass(bus);
      const mRes = {
        status: jest.fn().mockReturnValue(200),
        send: jest.fn()
      };

      // const mReq = {};
      const mReq = { params: {} }
      //act
      const response = await router.findOne(mReq, mRes, (e: any) => { console.log(e) });
      expect(response).toHaveProperty('status', 400)
    });


    test('2-findOne should fail if id is invalid', async () => {
      const mockResponse = { rows: [], totalCount: 1, page: 1 };
      const bus = new FaqBusConc(new FaqDalConc());
      bus.findOne = jest.fn().mockReturnValue(mockResponse);
      const router = new FaqRouterClass(bus);
      const mRes = {
        status: jest.fn().mockReturnValue(200),
        send: jest.fn()
      };

      // const mReq = {};
      const mReq = { params: { id: '123' } }
      //act
      const response = await router.findOne(mReq, mRes, (e: any) => { console.log(e) });
      expect(response).toHaveProperty('status', 400)
    });


    test('3-findOne should return 404 if id is ok but item is not found', async () => {
      const mockResponse = [];
      const bus = new FaqBusConc(new FaqDalConc());
      bus.findOne = jest.fn().mockReturnValue(mockResponse);
      const router = new FaqRouterClass(bus);
      const mRes = {
        status: jest.fn().mockReturnValue(200),
        send: jest.fn()
      };

      // const mReq = {};
      const mReq = { params: { id: '6571769ef9e06365aab1c7c8' } }
      //act
      const response = await router.findOne(mReq, mRes, (e: any) => { console.log(e) });
      expect(response).toEqual(expect.objectContaining({
        status: 404
      }))
    })

    test('4-findOne should return 200 if id is ok and item is found', async () => {
      const mockResponse = ['1', '2'];
      const bus = new FaqBusConc(new FaqDalConc());
      bus.findOne = jest.fn().mockReturnValue(mockResponse);
      const router = new FaqRouterClass(bus);
      const mRes = {
        status: jest.fn().mockReturnValue(200),
        send: jest.fn()
      };

      // const mReq = {};
      const mReq = { params: { id: '6571769ef9e06365aab1c7c8' } }
      //act
      const response = await router.findOne(mReq, mRes, (e: any) => { console.log(e) });
      expect(response).toEqual(expect.objectContaining({
        status: 200
      }))

    })
  });

  describe("createOne", function () {
    test('1-createOne should fail if entity is not valid', async () => {
      const mRes = {
        status: jest.fn().mockReturnValue(400),
        send: jest.fn()
      };

      // const mReq = {};
      const mReq = {

        body: {
          name: 'aaaa'
        }

      }
      const bus = new FaqBusConc(new FaqDalConc());
      bus.createOne = jest.fn().mockReturnValue({});
      const router = new FaqRouterClass(bus);

      //act
      const response = await router.createOne(mReq, mRes, (e: any) => { console.log(e) });
      expect(response).toHaveProperty('status', 400)

    });


    test('2-createOne should succssed if entity valid faqEntity', async () => {
      const mRes = {
        status: jest.fn().mockReturnValue(400),
        send: jest.fn()
      };

      // const mReq = {};
      const mReq = {

        body: {
          "_id": "",
          "groupId": "6702f6ff757dac373460a145",
          "question": "dsdsd",
          "answer": "asdasdasd",
          "display": true,
          "priority": 1,
          "createdAt": ""
        }

      }
      const bus = new FaqBusConc(new FaqDalConc());
      bus.createOne = jest.fn().mockReturnValue({});
      const router = new FaqRouterClass(bus);

      //act
      const response = await router.createOne(mReq, mRes, (e: any) => { console.log(e) });
      console.log(response)
      expect(response).toHaveProperty('status', 200)

    });


    test('3-createOne should fail if retuned object from dal is null', async () => {
      const mRes = {
        status: jest.fn().mockReturnValue(400),
        send: jest.fn()
      };

      // const mReq = {};
      const mReq = {

        body: {
          "_id": "",
          "groupId": "6702f6ff757dac373460a145",
          "question": "dsdsd",
          "answer": "asdasdasd",
          "display": true,
          "priority": 1,
          "createdAt": ""
        }

      }
      const bus = new FaqBusConc(new FaqDalConc());
      bus.createOne = jest.fn().mockReturnValue(null);
      const router = new FaqRouterClass(bus);

      //act
      const response = await router.createOne(mReq, mRes, (e: any) => { console.log(e) });
      console.log(response)
      expect(response).toHaveProperty('status', 400)

    });
  });




});