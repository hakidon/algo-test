import Api from './Api'
import Table from './Table'
// import 'https://fonts.googleapis.com/css?family=Open+Sans:300,400'
// import './layout/styles/font-awesome.min.css'
// import './layout/styles/bootstrap.min.css'
// import './layout/styles/templatemo-style.css'
// import './layout/scripts/modernizr.custom.86080.js'
// import './layout/scripts/particles.js'
// import './layout/scripts/app.js'

import QRCode from 'react-qr-code'
import { useState, useEffect } from 'react'
// import algosdk from "algosdk"
// import MyAlgoConnect from "@randlabs/myalgo-connect"

const Main = (props) => {
    var [inputWallet, setInputWallet] = useState();

    //Ridirect function
    const setRedirect = (inputWallet) => {
        props.setWallet(inputWallet)
        props.navigation('/MainMenu')
    }

    return (
        <div className="main">
            <Api setDataAll={props.setDataAll} setDataDistributer={props.setDataDistributer} />

            <h1>This is login page</h1>
            <center>
                <input
                    type="text"
                    onChange={(e) => setInputWallet(e.target.value)}
                    placeholder="Insert wallet"
                />
            </center>
            {/* Set user wallet */}
            <button onClick={() => setRedirect(inputWallet)}>login</button>
        </div >
    )
};

const MainMenu = (props) => {
    const walletAdmin = 'TKFWGIK3TTRU7C5GCZCTMLT6D5TML6BYVER54OCGFWSC443BUI2XLNDFOQ' //Manufacter

    let isDistributer = false
    let isAdmin = false
    let isUser = false

    if (props.wallet) {
        if (props.wallet === walletAdmin)
            isAdmin = true
        else {
            props.dataDistributer.forEach(distributer => {
                if (props.wallet === distributer)
                    isDistributer = true
            })
        }
        if (isDistributer || isAdmin)
            isUser = true
    }

    //Redirect if no wallet
    useEffect(() => {
        if (!props.wallet)
            props.navigation('/')
        else {
            if (!isUser) {
                alert('Account has not been registered yet!')
                props.navigation('/')
            }
        }    
    }, [])


    if (!props.wallet) {
        return (
            <div>
                <h5>
                    Improper redirect detected! Please login.
                </h5>
            <button
                onClick={() => {
                    // api call
                    // change to the about page
                    props.setWallet('')
                    props.navigation('/');
                }}
            >Login</button>
        </div>
        )
    }

    if (!props.dataAll) {
        return (
            <div className="App">
                <h1>Loading</h1>
            </div>
        )
    }

    if (isAdmin) {
        return (
            <div className="App">
                <Api wallet={props.wallet} dataAll={props.dataAll} dataView={props.dataView} setDataView={props.setDataView} setDataAssign={props.setDataAssign} />

                <h1>Instrument Check (Admin) </h1>
                <button
                    onClick={() => {
                        // api call
                        // change to the about page
                        props.navigation('/Add')
                    }}
                >Add</button>

                <button
                    onClick={() => {
                        // api call
                        // change to the about page
                        props.navigation('/ViewAssign');
                    }}
                >Assign</button>

                <button
                    onClick={() => {
                        // api call
                        // change to the about page
                        props.navigation('/ViewAll');
                    }}
                >View</button>

                <button
                    onClick={() => {
                        // api call
                        // change to the about page
                        props.setWallet('')
                        props.navigation('/');
                    }}
                >Logout</button>
            </div>
        )
    }

    if (isDistributer) {
        return (
            <div className="App">
                <Api wallet={props.wallet} dataAll={props.dataAll} dataView={props.dataView} setDataView={props.setDataView} setDataAssign={props.setDataAssign} />

                <h1>Instrument Check (Distributer)</h1>
                <button
                    onClick={() => {
                        // api call
                        // change to the about page
                        props.navigation('/ViewAssign');
                    }}
                >Assign</button>

                <button
                    onClick={() => {
                        // api call
                        // change to the about page
                        props.navigation('/ViewAll');
                    }}
                >View</button>

                <button
                    onClick={() => {
                        // api call
                        // change to the about page
                        props.setWallet('')
                        props.navigation('/');
                    }}
                >Logout</button>
            </div>
        )
    }


};


const ViewAll = (props) => {
    return (
        < div className="container" >
            <Table dataView={props.dataView} navigation={props.navigation} />
        </div >
    )
};

const ViewAssign = (props) => {
    return (
        < div className="container" >
            <Table dataAssign={props.dataAssign} navigation={props.navigation} />
        </div >
    )
};

const ViewInstrument = (props) => {
    return (
        < div className="container" >
            <Api dataIns={props.dataIns} setDataIns={props.setDataIns} index={props.index} navigation={props.navigate} />

            {/* <Table dataIns={props.dataIns} navigation={props.navigation} /> */}
        </div >
    )
};

const Add = (props) => {
    const [instrument_id, set_instrument_id] = useState();
    const [full_url, set_full_url] = useState();

    const base_url = 'http://localhost:3000'
    const app_url = '/algo-test/ViewInstrument?id='
    const view_url = base_url + app_url

    return (
        <div className="add">
            {/* <h1>This is add page</h1> */}
            <center>
                <input
                    type="text"
                    onChange={(e) => set_instrument_id(e.target.value)}
                    placeholder="Input instrument id here"
                />

            </center>

            {full_url && (
                <QRCode
                    title="Instrument"
                    value={full_url}
                    bgColor='white'
                    fgColor='black'
                    size={300}
                />
            )}
            <button onClick={() => set_full_url(view_url + instrument_id)}>Add</button>
            <button onClick={() => props.navigation('/MainMenu')}>Back</button>

        </div>
    )
};

const Assign = (props) => {
    return (

        <div className="assign">
            <h1>This is assign page</h1>
            <button onClick={() => props.navigation('/ViewAssign')}>Back</button>
        </div>
    )
};

const Detail = (props) => {
    return (

        <div className="detail">
            <h1>This is detail page</h1>
            <button onClick={() => props.navigation('/')}>Back</button>
        </div>
    )
};


export { Main, MainMenu, ViewAll, ViewAssign, ViewInstrument, Add, Assign, Detail };
