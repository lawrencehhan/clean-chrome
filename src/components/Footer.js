import React from 'react'
import gitHubImg from '../images/github-24.png'

export default function Footer() {
    return (
        <div className="footer">
            <span>
                <img className="github-logo" src={gitHubImg}></img>
            </span>
            <span>
                <a className="github-link" alt="Github Source" href="https://github.com/lawrencehhan/clean-chrome" target="_blank">Read More</a>
            </span>
        </div>
    )
}