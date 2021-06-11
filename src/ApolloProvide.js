import React from 'react';
import App from './App';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import {store} from './Redux/Store';
import {Provider} from 'react-redux';
import {setContext} from 'apollo-link-context';
import {createUploadLink} from 'apollo-upload-client';
import backendURL from './config';


const httpLink= createUploadLink({
    uri: backendURL
})

const authLink = setContext(() => {
    const token= localStorage.getItem('jwtToken');
    return{
        headers: {
            Authorization: token ? `Bearer ${token}`: ""
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

export default(
    <ApolloProvider client= {client}>
        <Provider store={store}>
            <App />
        </Provider>
    </ApolloProvider>
)
