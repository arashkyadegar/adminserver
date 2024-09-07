var ObjectId = require("mongodb").ObjectId;
export const parseToObjectId = (value:  string) => {
     return new ObjectId(value);
};
