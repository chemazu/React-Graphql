import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  useMutation,
} from "@apollo/client";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const client = new ApolloClient({
  // uri: "https://api.spacex.land/graphql/",
  uri: "https://test-api.sytbuilder.com/graphql",
  cache: new InMemoryCache(),
});
const INCREMENT_COUNTER = gql`
  # Increments a back-end counter and gets its resulting value
  mutation Mutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    signup(
      first_name: $firstName
      last_name: $lastName
      email: $email
      password: $password
    ) {
      user {
        first_name
        last_name
        email
      }
    }
  }
`;

// client
//   .query({
//     query: gql`
//       query GetRates {
//         rates(currency: "USD") {
//           currency
//         }
//       }
//     `
//   })
//   .then(result => console.log(result));
// console.log(client);
// client
//   .query({
//     query: gql`
//       query Launches {
//         launches {
//           mission_name
//           mission_id
//           rocket {
//             rocket_name
//             rocket {
//               company
//               name
//               mass {
//                 kg
//               }
//             }
//           }
//           launch_site {
//             site_name
//           }
//           launch_date_local
//         }
//       }
//     `,
//   })
//   .then((res) => {
//     return res;
//   })
//   .then((result) => console.log(result));
// .then((result) => console.log(result));
root.render(
  
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
