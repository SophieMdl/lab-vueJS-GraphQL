const path = require("path");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql;

const countries = new GraphQLObjectType({
  name: "countries",
  fields: {
    name: {
      type: GraphQLString,
      resolve: parent => parent.name
    },
    flag: {
      type: GraphQLString,
      resolve: parent => parent.accuracy
    },
    alpha2Code: { type: GraphQLString, resolve: parent => parent.alpha2Code },
    numericCode: { type: GraphQLString, resolve: parent => parent.numericCode },
    flag: { type: GraphQLString, resolve: parent => parent.flag }
  }
});

exports.countries = countries;
