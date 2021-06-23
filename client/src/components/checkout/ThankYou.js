import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom';
import React from 'react'

function ThankYou() {
    return (
        <div style={{ marginTop: "300px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1> Thank you for Your Payment!</h1>
            <Link to="/"><Button variant="outlined" color="primary">Return Home</Button></Link>
        </div>
    )
}

export default ThankYou
