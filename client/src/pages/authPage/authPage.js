import React, {useState, useEffect, useContext} from "react";
import {useHTTP} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";
import {useAuth} from "../../hooks/auth.hook";
import {AuthContext} from "../../context/AuthContext";


export const AuthPage = (props) => {
    const [form, setForm] = useState( {
        email: "", password: ""
    } );

    const changeHandler = (event)=>{
        setForm({...form,  [event.target.name]: event.target.value}) ;
    };

    const {loading, request, error, clearError} = useHTTP();
    const message = useMessage();
    const auth = useContext(AuthContext);

    useEffect( ()=>{
        message(error);
        clearError();
    }, [error, message, clearError] );

    useEffect( ()=>{
        window.M.updateTextFields();
    }, [] );

    const registerHandler = async ()=>{
        try {
            const data = await request("/api/auth/register", "POST", {...form});
            message(data.message);
        } catch (e) {  }
    }

    const loginHandler = async ()=>{
        try {
            const data = await request("/api/auth/login", "POST", {...form});
            message(data.message);
            auth.login(data.token, data.userId);
        } catch (e) {  }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Сократи ссылку</h1>
                <div className="card light-blue darken-2">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация пользователя</span>
                        <div>
                            <div className="input-field">
                                <input 
                                    placeholder="Введите свой email" 
                                    id="email" 
                                    type="text"
                                    name="email"
                                    onChange={changeHandler}
                                    className="yellow-input validate white-text"
                                    value={form.email}
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input 
                                    placeholder="Введите свой пароль" 
                                    id="password" 
                                    type="password" 
                                    name="password"
                                    className="yellow-input validate white-text"
                                    onChange={changeHandler}
                                    value={form.password}
                                />
                                <label htmlFor="password">password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn yellow darken-4" style={{marginRight: 10}} disabled={loading} onClick={loginHandler} >Login</button>
                        <button className="btn grey lighten-1 black-text" onClick={registerHandler} disabled={loading} >Registration</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
