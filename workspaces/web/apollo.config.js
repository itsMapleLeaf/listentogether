module.exports = {
  client: {
    service: {
      name: "api",
      localSchemaFile: `${__dirname}/../api/src/generated/schema.graphql`,
      includes: [`${__dirname}/src/**/*.graphql`],
    },
  },
}
