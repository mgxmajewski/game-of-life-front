import {
    ApolloClient,
    InMemoryCache,
} from "@apollo/client";
import {WebSocketLink} from "@apollo/client/link/ws";
import {SubscriptionClient} from 'subscriptions-transport-ws' // <- import this
import {authenticatedToken} from "../utils/cache";

export const getToken = () => {
    return `${authenticatedToken()}`;
};

export const wsClient = typeof window !== "undefined"
? new SubscriptionClient(
    `${process.env.GATSBY_GQL_URL}`,
    {
        reconnect: true,
        lazy: true,
        connectionParams: () => ({
            Authorization: getToken()
        })
    })  : null;

export const link = typeof window !== "undefined"
    ? new WebSocketLink(wsClient)
    : null;

export const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

