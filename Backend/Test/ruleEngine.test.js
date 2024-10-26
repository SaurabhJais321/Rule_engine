const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app"); // Assuming you have an Express server in `server.js`
const Rule = require("../models/rule"); // Import the Rule model
const expect = chai.expect;

chai.use(chaiHttp); // For making HTTP requests in tests

describe("Rule Controller Tests", function () {
  // Before each test, clear the Rule collection to avoid conflicts
  beforeEach(async function () {
    this.timeout(5000); // Set a longer timeout for async operations
    await Rule.deleteMany({});
  });

  describe("POST /create-rule", () => {
    it("should create a new rule and return the rule object", async function () {
      const res = await chai
        .request(server)
        .post("/api/rules/create-rule")
        .send({
          name: "Test Rule",
          ruleString: "((age > 30 AND department = 'Sales') OR (age < 25 ANDdepartment = 'Marketing')) AND (salary > 50000 OR experience >5)"
        });

      expect(res).to.have.status(201);
      expect(res.body).to.have.property("name", "Test Rule");
      expect(res.body).to.have.property(
        "description",
        "((age > 30 AND department = 'Sales') OR (age < 25 ANDdepartment = 'Marketing')) AND (salary > 50000 OR experience >5)"
      );
      expect(res.body).to.have.property("ast"); // Should contain the AST representation
    });
  });

  describe("POST /combine-rules", () => {
    it("should combine two rules and return a combined rule", async function () {
      this.timeout(5000); // Set a timeout for async operations

      const r1 = await chai
        .request(server)
        .post("/api/rules/create-rule")
        .send({
          name: "Test Rule 1",
          ruleString:
            "((age > 30 AND department = 'Sales') OR (age < 25 ANDdepartment = 'Marketing')) AND (salary > 50000 OR experience >5)",
        });

        const r2 = await chai
          .request(server)
          .post("/api/rules/create-rule")
          .send({
            name: "Test Rule 2",
            ruleString:
               "((age > 30 AND department = 'Marketing')) AND (salary >20000 OR experience > 5)",
          });

      const res = await chai
        .request(server)
        .post("/api/rules/combine-rules")
        .send({
          rulesDescription: [
            "((age > 30 AND department = 'Sales') OR (age < 25 ANDdepartment = 'Marketing')) AND (salary > 50000 OR experience >5)",
            "((age > 30 AND department = 'Marketing')) AND (salary >20000 OR experience > 5)",
          ],
        });

      expect(res).to.have.status(201);
      expect(res.body).to.have.property("name", "Combined Rule");
      expect(res.body).to.have.property("description").that.includes("AND");
      expect(res.body).to.have.property("ast"); // Combined AST
    });
  });

  describe("POST /evaluate-rule", () => {
    it("should evaluate a rule with user data and return true", async function () {
      this.timeout(5000); // Set a timeout for async operations

    
      const r2 = await chai
        .request(server)
        .post("/api/rules/create-rule")
        .send({
          name: "Test Rule 2",
          ruleString:
            "((age > 30 AND department = 'Marketing')) AND (salary >20000 OR experience > 5)",
        });


      const res = await chai
        .request(server)
        .post("/api/rules/evaluate-rule")
        .send({
          ruleDescription:
            "((age > 30 AND department = 'Marketing')) AND (salary >20000 OR experience > 5)",
          data: {
            age: 35,
            department: "Marketing",
            salary: 60000,
            experience: 3
          },
        });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property("result", true);
    });

    it("should return false when user data does not satisfy the rule", async function () {
      this.timeout(5000); // Set a timeout for async operations

      const r = await chai
        .request(server)
        .post("/api/rules/create-rule")
        .send({
          name: "Test Rule 2",
          ruleString:
            "((age > 30 AND department = 'Marketing')) AND (salary >20000 OR experience > 5)",
        });

      const res = await chai
        .request(server)
        .post("/api/rules/evaluate-rule")
        .send({
          ruleDescription:
            "((age > 30 AND department = 'Marketing')) AND (salary >20000 OR experience > 5)",
          data: {
            age: 25,
            department: "Sales",
            salary: 60000,
            experience: 3,
          },
        });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property("result", false);
    });
  });
});
