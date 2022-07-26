import { gql } from "@apollo/client";

export const allBooks = gql `
    query{
        allBooks{
            title,
            published,
            author,
            id,
            genres
        }
    }
`

export const allAuthors = gql `
    query{
        allAuthors{
            name,
            born,
            bookCount,
        }
    }
`