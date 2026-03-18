import axios from 'axios';

export class DbUtils {
  private static readonly testDataApiEndpoint = 'http://localhost:3001/testData';

  /**
   * Seeds the database with initial test data.
   * Equivalent to Cypress cy.task("db:seed")
   */
  static async seed() {
    try {
      await axios.post(`${this.testDataApiEndpoint}/seed`);
    } catch (error) {
      console.error('Error seeding database:', error);
      throw error;
    }
  }

  /**
   * Finds a user in the database by any attribute.
   * Equivalent to Cypress cy.task("find:database", { entity: "users", query: { username: "..." } })
   */
  static async findUser(query: Record<string, any>) {
    try {
      const { data } = await axios.get(`${this.testDataApiEndpoint}/users`);
      const user = data.results.find((user: any) => {
        return Object.entries(query).every(([key, value]) => user[key] === value);
      });
      if (!user) {
        console.log(`User not found for query: ${JSON.stringify(query)}. Available users:`, data.results.map((u: any) => u.username));
      }
      return user;
    } catch (error) {
      console.error('Error finding user in database:', error);
      throw error;
    }
  }
}
