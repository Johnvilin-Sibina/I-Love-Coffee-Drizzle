# Agent Guidelines for ilovecoffee-drizzle

## Commands

- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **Test all**: `npm test`
- **Test single**: `npm test -- --testPathPattern="coffees.service.spec.ts"`
- **Test watch**: `npm run test:watch`
- **Test coverage**: `npm run test:cov`
- **Test e2e**: `npm run test:e2e`

## Code Style

- **Language**: TypeScript with NestJS framework
- **Formatting**: Prettier (single quotes, trailing commas)
- **Linting**: ESLint with TypeScript recommended rules
- **Imports**: Group NestJS imports first, then local imports
- **Naming**: PascalCase for classes/DTOs, camelCase for methods/properties
- **Types**: Explicit types preferred, but inferred returns common
- **Database**: Drizzle ORM with PostgreSQL
- **Error handling**: Use NestJS exceptions and guards
- **Testing**: Jest with standard NestJS testing patterns
