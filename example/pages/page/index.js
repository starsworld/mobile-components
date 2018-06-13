import React from 'react';
import {Page} from "../../../src";

const PageDemo = () =>(
    <Page transition={true} style={{padding: '0 10px'}}>
        <h1>Page Demo</h1>
        <section>
            <h3>H3 header</h3>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute
            </p>
        </section>
    </Page>
)

export default PageDemo;