// React dependencies
import React from 'react';
import {Link} from 'react-router';

export default class GlobalHeader extends React.Component {
    render() {
        return (
            <header className="globalHeader">
                <Link to="/">
                    Giraffe<span className="visibly-hidden"> home page</span>
                </Link>
            </header>
        )
    }
}