import request from 'supertest';

export const thenTheCreateResponseShouldBeSuccessful = (createResponse: request.Response) => {
  expect(createResponse.status).toEqual(201);
};

export const thenTheGetResponseShouldBeSuccessful = (getResponse: request.Response) => {
  expect(getResponse.status).toEqual(200);
};

export const thenTheDeleteResponseShouldBeSuccessful = (deleteResponse: request.Response) => {
  expect(deleteResponse.status).toEqual(200);
};

export const thenTheUpdateResponseShouldBeSuccessful = (updateResponse: request.Response) => {
  expect(updateResponse.status).toEqual(200);
};

export const thenTheResponseShouldBeBadRequest = (updateResponse: request.Response) => {
  expect(updateResponse.status).toEqual(400);
};

export const thenTheResponseShouldBeNotFound = (updateResponse: request.Response) => {
  expect(updateResponse.status).toEqual(404);
};

export const thenTheResponseShouldBeForbidden = (updateResponse: request.Response) => {
  expect(updateResponse.status).toEqual(403);
};

export const thenTheResponseShouldBeUnauthorized = (updateResponse: request.Response) => {
  expect(updateResponse.status).toEqual(401);
};

export const thenTheResponseShouldBeServerError = (updateResponse: request.Response) => {
  expect(updateResponse.status).toEqual(500);
};
