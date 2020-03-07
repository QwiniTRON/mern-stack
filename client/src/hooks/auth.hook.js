import {useState, useCallback, useEffect} from "react";

export const useAuth = ()=>{
    const [token, setToken] = useState(null);
    const [ready, setReady] = useState(false);
    const [userId, setUserId] = useState(null);

    const login = useCallback(async (jwtToken, id)=>{
        setToken(jwtToken);
        setUserId(id);

        localStorage.setItem("userData", JSON.stringify({
            token: jwtToken, userId: id
        }));
    }, [] );

    const logout = useCallback(async ()=>{
        setToken(null);
        setUserId(null);
        localStorage.removeItem("userData");
    }, [] );

    useEffect( ()=>{
        const data = JSON.parse(localStorage.getItem("userData"));

        if(data && data.token){
            login(data.token, data.userId);
        }

        setReady(true);
    }, [login] );

    return {
        login,
        logout,
        token,
        userId,
        ready
    };
}


