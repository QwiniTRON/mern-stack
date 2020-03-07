import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import LinksPage from "./pages/linksPage/linksPage";
import CreatePage from "./pages/createPage/createPage";
import {DetailPage} from "./pages/detailPage/detailPage";
import {AuthPage} from "./pages/authPage/authPage";

export const useRoutes = (isLogin)=>{
    if(isLogin){
        return (
            <Switch>
                <Route path="/links" exact>
                    <LinksPage />
                </Route>
                <Route path="/create" exact>
                    <CreatePage />
                </Route>
                <Route path="/detail/:id">
                    <DetailPage />
                </Route>
                <Redirect to="/create" />
            </Switch>
        );
    }

    return (
    <Switch>
        <Route path="/" exact>
            <AuthPage></AuthPage>
        </Route>    
        <Redirect to="/" />
    </Switch>
    );
}










