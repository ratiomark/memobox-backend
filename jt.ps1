param(
    [string]$tp
)

npx cross-env NODE_ENV=testing npx jest --config test/jest-e2e.ts --verbose -T --detectOpenHandles $tp