# WunderGraph Demo project

This project is a simple Todo list (Trello style) using Wundergraph, Next.js, Prisma, Graphql, Typescript and PostgreSQL.


## Getting Started

Install the dependencies and run the complete example in one command:

```shell
npm install && npm start
```

After a while, a new browser tab will open,
and you can start exploring the application.
If no tab is open, navigate to [http://localhost:3000](http://localhost:3000).

Running WunderGraph will automatically introspect the database and generate an API.

## Updating the Database Schema

Change the `schema.prisma` file and run `npm run migrate %your_migration_name%`,
e.g. `npm run migrate "add pets"`.

## Seeding the Database

Once you've defined one or more Mutations in `./wundergraph/operations` (see CreateUser.graphql as an example),
you're able to use the generated TypeScript client to seed the Database.

Modify `./seed/seed.ts` and run `npm run seed`.

## Cleanup

```shell
npm run cleanup
```
