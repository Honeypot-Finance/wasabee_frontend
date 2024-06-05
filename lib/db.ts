
import postgres from 'postgres'
export const pg = postgres(process.env.DB!, {
    max: process.env.NODE_ENV === "development" ? 10 : 50,
    idle_timeout: 10,
    connect_timeout: 30,
    ssl: true,
    connection: {
      application_name: "iotexscan",
    },
  })