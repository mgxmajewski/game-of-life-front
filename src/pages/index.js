import * as React from "react"
import NavBar from "../components/NavBar";
import Layout from "../components/Layout";

const IndexPage = () => {
    return (
        <Layout>
        <section>
            <div>
                <NavBar/>
                <h2>Hello Cat!</h2>
            </div>
        </section>
        </Layout>
    )
}

export default IndexPage
