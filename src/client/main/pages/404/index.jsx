import React from "react";
import { Link } from "react-router-dom";

export default function Page404() {
    return (
        <div className="main-page" id="page-404">
            <div className="col-4 offset-4 text-center" style={{ marginTop: "100px" }}>
                <h1>Page 404</h1>
                <hr />
                <p>Sorry, this page either does not exist or has gone on vacation and {"didn't"} leave a replacement.</p>
                <Link to="/main" className="btn btn-primary btn-lg btn-block">
                    Home
                </Link>
            </div>
        </div>
    );
}
