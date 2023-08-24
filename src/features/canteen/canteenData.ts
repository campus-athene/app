import { useQuery } from '@tanstack/react-query';
import { gql, GraphQLClient } from 'graphql-request';

interface Image {
  __typename: string;
  id: string;
  url: string;
  thumbUrl: string;
}

interface Dish {
  __typename: string;
  id: string;
  type: string;
  rating: number;
  ratingCount: number;
  dispositionPriority: number;
  name: string;
  price: number;
  image: Image | null;
  allergics: string[];
  additionals: string[];
  feedback?: any;
  lastUpdated: number;
}

interface IssuingOffice {
  __typename: string;
  id: string;
  name: string;
  canteenId: string;
}

export interface MenuItem {
  __typename: string;
  id: string;
  date: number;
  dish: Dish;
  issuingOffice: IssuingOffice;
  lastUpdated: number;
}

const client = new GraphQLClient('https://mensa.k8s.incloud.de/graphql');
client.setHeader('authorization', 'FA01A4B6-B074-4917-B73F-E9A7ACCF2110');

const menuItemsQuery = gql`
  query MenuItems(
    $canteenId: ID!
    $status: UserStatus!
    $lang: Language!
    $minDate: String
    $maxDate: String
  ) {
    menuItems(canteen: $canteenId, minDate: $minDate, maxDate: $maxDate) {
      __typename
      id
      date
      dish {
        __typename
        id
        type
        rating
        ratingCount
        dispositionPriority
        name(language: $lang)
        price(status: $status)
        image {
          __typename
          id
          url
          thumbUrl
        }
        allergics
        additionals
        feedback {
          __typename
          id
          tasteRating
          priceRating
          message
        }
        lastUpdated
      }
      issuingOffice {
        __typename
        id
        name
        canteenId
      }
      lastUpdated
    }
  }
`;

export const useMenuItems = ({
  canteenId,
  days,
}: {
  canteenId: '1' | '2';
  days: number;
}) =>
  useQuery<{ menuItems: MenuItem[] }>({
    queryKey: ['canteen', 'menuItems', canteenId],
    queryFn: () =>
      client.request(menuItemsQuery, {
        minDate: new Date().toISOString().substring(0, 10),
        maxDate: new Date(Date.now() + (days - 1) * 24 * 60 * 60 * 1000)
          .toISOString()
          .substring(0, 10),
        status: 'STUDENT',
        lang: 'DE',
        canteenId,
      }),
  });
