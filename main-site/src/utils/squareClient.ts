import { Client, Environment, ApiError } from "square";

const squareClient = (accessToken?:string) => new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
  additionalHeaders: {
    Authorization: `Bearer ${accessToken}`
  }
});


export default squareClient;