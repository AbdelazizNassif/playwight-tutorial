// @ts-check
const { test, expect } = require("@playwright/test");
const dataJson =       {
              name: "Taofiq",
              email: "email@email.com",
              status: "inactive",
              gender: "male",
            }
// relatvie path + format string


test.describe("Test user E2E CRUD operation", () => {
  var id;
  const email = "taofiq"+Date.now()+"@outlook.com";
  var gender ;

  test("create a new user", async ({ request, baseURL }) => {
    gender = dataJson.gender;
    const response = await request.post(`${baseURL}users`, {
      headers: {
        "Content-Type" : "application/json"
      },
      data: {
        name: "Taofiq",
        email: email,
        status: "inactive",
        gender: gender,
      },
    });
    expect(response.ok()).toBeTruthy();
    await expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody.name).toEqual("Taofiq");
    expect(responseBody.status).toEqual("inactive");
    expect(responseBody.gender).toEqual("male");
    expect(responseBody.email).toEqual(email);
    expect(responseBody.id).toBeDefined();
    id = responseBody.id ;
  });

  test('Get list of users', async ({ request, baseURL }) => {
    const response = await request.get(`${baseURL}users`, {
      headers: {
        "Content-Type" : "application/json"
      }
    });
    expect(response.ok()).toBeTruthy();
    await expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody[0].id).toEqual(id);
  });
  test('Get recently created user', async ({ request, baseURL }) => {
    const response = await request.get(`${baseURL}users/${id}`, {
      headers: {
        "Content-Type" : "application/json"
      }
    });
    expect(response.ok()).toBeTruthy();
    await expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.name).toEqual("Taofiq");
    expect(responseBody.status).toEqual("inactive");
    expect(responseBody.gender).toEqual("male");
    expect(responseBody.email).toEqual(email);
    expect(responseBody.id).toEqual(id);
  });
  test('Delete recently created user', async ({ request, baseURL }) => {
    const response = await request.delete(`${baseURL}users/${id}`, {
      headers: {
        "Content-Type" : "application/json"
      }
    });
    expect(response.ok()).toBeTruthy();
    await expect(response.status()).toBe(204);
  });
  test('Check user is Deleted successfully', async ({ request, baseURL }) => {
    const response = await request.get(`${baseURL}users/${id}`, {
      headers: {
        "Content-Type" : "application/json"
      }
    });
    expect(response.ok()).toBeFalsy();
    await expect(response.status()).toBe(404);
    const responseBody = await response.json();
    expect(responseBody.message).toEqual("Resource not found");
  });
});
