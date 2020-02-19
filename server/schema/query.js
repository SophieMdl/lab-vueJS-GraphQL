const path = require("path");
const { GraphQLObjectType, GraphQLList } = require("graphql");
const { countries } = require(path.resolve("schema/types"));

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  type: "Query",
  fields: {
    countries: {
      type: new GraphQLList(countries),
      resolve() {
        const data = require(path.resolve("data/all.json"));
        return data;
      }
    }
  }
});
exports.query = RootQuery;
