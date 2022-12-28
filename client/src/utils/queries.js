import { gql } from "@apollo/client";

export const QUERY_ME = gql`
{
    me {
        _id
        username
        email
        savedBooks{
            bookId
            title
            authors
            description
            image
            link
        }
    
    }
}
`;

export default QUERY_ME;