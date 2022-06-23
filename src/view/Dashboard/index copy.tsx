import React from "react";
import { useQuery, gql } from "@apollo/client";

type Props = {};

export default function Dashboard({}: Props) {
  const Launches = gql`
    # query Launches {
    #   launches {
    #     mission_name
    #     mission_id
    #     rocket {
    #       rocket_name
    #       rocket {
    #         company
    #         name
    #         mass {
    #           kg
    #         }
    #       }
    #     }
    #     launch_site {
    #       site_name
    #     }
    #     launch_date_local
    #   }
    # }
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
  const { loading, error, data } = useQuery(Launches);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return data.launches.map((launch: any) => (
    <div key={launch.mission_id}>
      <h1>{launch.mission_name}</h1>
      <p>{launch.launch_date_local}</p>
      <p>{launch.launch_site.site_name}</p>
      <p>{launch.rocket.rocket_name}</p>
    </div>
  ));
}
