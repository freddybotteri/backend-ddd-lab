import { Given, Then } from 'cucumber';
import request from 'supertest';
import app from '../../../../../src/apps/lab_backend/app';
import assert from 'assert';

let _request: request.Test;
let _response: request.Response;


Given('I send a POST request to {string} with body:', (route: string, body: string) => {
  _request = request(app)
    .put(route)
    .send(body);
});

Then('the response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status);
});

Then('the response should be empty', () => {
  assert.deepEqual(_response.body, {});
});
