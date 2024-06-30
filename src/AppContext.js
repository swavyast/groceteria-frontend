import React from "react";
import { useNavigate } from "react-router-dom";

export const NetworkContext = React.createContext();
export const AuthContext = React.createContext();
export const TokenContext = React.createContext();
export const MessageContext = React.createContext();
export const UserContext = React.createContext();



export const useNetworkContext = () => React.useContext(NetworkContext);
export const useAuthContext = () => React.useContext(AuthContext);
export const useTokenContext = () => React.useContext(TokenContext);
export const useMessageContext = () => React.useContext(MessageContext);
export const useUserContext = () => React.useContext(UserContext);

export const useNavigation = () => {
    const history = useNavigate();

    const navigate = (to) => {
        history(to);
    };

    return navigate;
};

export const AppContext = ({ children }) => {

    const [networkStatus, setNetworkStatus] = React.useState(
        {
            status: false,
            messageString: ''
        }
    );
    const networkContext = React.useMemo(() => ({ networkStatus, setNetworkStatus }), [networkStatus, setNetworkStatus]);

    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const authContext = React.useMemo(() => ({ isAuthenticated, setIsAuthenticated }), [isAuthenticated, setIsAuthenticated]);

    const [token, setToken] = React.useState(null);
    const tokenContext = React.useMemo(() => ({ token, setToken }), [token, setToken]);

    const [message, setMessage] = React.useState(null);
    const messageContext = React.useMemo(() => ({ message, setMessage }), [message, setMessage]);

    const [userDetails, setUserdetails] = React.useState(
        {
            id: 0,
            fname: '',
            mname: '',
            lname: '',
            gender: '',
            role: '',
            contacts: [],
            cart: {},
            addresses: [{
                id: 0,
                line1: '',
                line2: '',
                line3: '',
                city: '',
                state: '',
                country: '',
                pincode: 0
            }],
            email: '',
            avatar: '',
            isEnabled: false,
            isAccountLocked: false,
            isAccountExpired: false,
            isCredentialExpired: false
        }
    );

    const userContext = React.useMemo(() => ({ userDetails, setUserdetails }), [userDetails, setUserdetails]);

    return <>
        <NetworkContext.Provider value={networkContext}>
            <AuthContext.Provider value={authContext}>
                <TokenContext.Provider value={tokenContext}>
                    <MessageContext.Provider value={messageContext}>
                        <UserContext.Provider value={userContext}>
                            {children}
                        </UserContext.Provider>
                    </MessageContext.Provider>
                </TokenContext.Provider>
            </AuthContext.Provider>
        </NetworkContext.Provider>
    </>
}