module.exports = {
  client: {
    service: {
      name: "api",
      localSchemaFile: `${__dirname}/../api/src/generated/schema.graphql`,
    },
    excludes: [`${__dirname}/src/generated/**`],
  },
}
