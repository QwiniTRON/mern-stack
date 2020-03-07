import React, { useState, useEffect, useContext } from "react";
import { useHTTP } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

const CreatePage = (props) => {
    const { loading, request, error, clearError } = useHTTP();
    const auth = useContext(AuthContext);
    const history = useHistory();

    const [link, setForm] = useState("");

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const changeHandler = (e) => {
        setForm(e.target.value);
    };

    const keyPressHandler = async (e) => {
        if (e.key === "Enter") {
            try {
                const data = await request('/api/link/generate', 'POST', { from: link }, {
                    Authorization: `Bearer ${auth.token}`
                })
                history.push(`/detail/${data.link._id}`);
            } catch (e) { }
        }
    };

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
                <div className="input-field">
                    <input
                        placeholder="Введите свою ссылку"
                        id="link"
                        type="text"
                        name="link"
                        onChange={changeHandler}
                        className="validate"
                        value={link}
                        onKeyPress={keyPressHandler}
                    />
                    <label htmlFor="link">Введите ссылку</label>
                </div>
            </div>
        </div>
    );
}

export default CreatePage;