// TODOdone: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'xd620stq91'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // TODOdone: Create an Auth0 application and copy values from it into this map. For example:
  // domain: 'dev-nd9990-p4.us.auth0.com',
  domain: 'dev-1zkltqj3nyw4l3ck.us.auth0.com',            // Auth0 domain
  clientId: 'syp4C1CbG0FeJsGhw4qg4zuDQDe5gQeZ',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
