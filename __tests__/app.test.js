const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const { seed } = require("../db/seed");
const data = require("../db/test-data");

afterAll(() => {
	return db.end();
});

beforeEach(() => {
	return seed(data);
});

describe("Route not found", () => {
	test("404: request to non-existent route", () => {
		return request(app)
			.get("/apiodfskhgoshgoshrg")
			.expect(404)
			.then(({ body }) => {
				expect(body.msg).toBe("Not found");
			});
	});
});

describe("GET /api", function () {
	test("200: should respond with an okay message", function () {
		return request(app) // returning a promise (so jest waits for the response)
			.get("/api")
			.expect(200) // asserting with supertest that the status is 200
			.then(({ body }) => {
				expect(body.msg).toBe("all okay!"); // jest assertion
			});
	});
});

describe("GET /api/snacks/:snack_id", () => {
	test("200: responds with an individual snack", () => {
		return request(app)
			.get("/api/snacks/1")
			.expect(200)
			.then(({ body }) => {
				expect(body.snack).toMatchObject({
					snack_id: 1,
					snack_name: "snack a",
					snack_description: "snack description a",
					price_in_pence: 100,
					category_id: 2,
				});
			});
	});
	test("404: snack id does not exist", () => {
		return request(app)
			.get("/api/snacks/50000")
			.expect(404)
			.then(({ body }) => {
				expect(body.msg).toBe("Not found");
			});
	});
	test("400: snack id is not a number", () => {
		return request(app)
			.get("/api/snacks/squirtle")
			.expect(400)
			.then(({ body }) => {
				expect(body.msg).toBe("Bad request");
			});
	});
});

describe("POST /api/snacks", () => {
	test("201: successfully adds new snack", () => {
		const newSnack = {
			snack_name: "chocolate buttons",
			snack_description: "round and delicious",
			price_in_pence: 100,
			category_id: 4,
		};
		return request(app)
			.post("/api/snacks")
			.send(newSnack)
			.then(({ body }) => {
				expect(body.snack).toMatchObject({
					snack_id: 7,
					snack_name: "chocolate buttons",
					snack_description: "round and delicious",
					price_in_pence: 100,
					category_id: 4,
				});
			});
	});
});
