import React, { Component } from 'react'
import "./Graph.css"
import fG from '../fakeGraph.png'

export default class Graph extends Component {
    render() {
        return (
            <div className="graph">
                <h1>Awesome! Here are your moods for the past year with Shimmer.</h1>
                <img alt="fake graph" src={fG}></img>
            </div>
        )
    }
}
