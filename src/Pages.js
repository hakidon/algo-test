import Api from './Api'
import Table from './Table'
import Li from './List'
import React, { Component } from 'react'

import * as buffer from "buffer";

// import 'https://fonts.googleapis.com/css?family=Open+Sans:300,400'
// import './layout/styles/font-awesome.min.css'
// import './layout/styles/bootstrap.min.css'
// import './layout/styles/templatemo-style.css'
// import './layout/scripts/modernizr.custom.86080.js'
// import './layout/scripts/particles.js'
// import './layout/scripts/app.js'

import QRCode from 'react-qr-code'
import { useState, useEffect } from 'react'
import algosdk from "algosdk"
import MyAlgoConnect from "@randlabs/myalgo-connect"

window.Buffer = buffer.Buffer;
var isDistributer = false
var isAdmin = false
var isUser = false

const reset = () => {
    isDistributer = false
    isAdmin = false
    isUser = false
}

//Algo connect ----- start
const myAlgoConnect = new MyAlgoConnect();
const algodClient = new algosdk.Algodv2(
    "",
    "https://node.testnet.algoexplorerapi.io",
    ""
);
const encoder = new TextEncoder();

export default function Apptest() {
    const [account, setAccount] = useState(null);
    const [signedTx, setSignedTx] = useState(null);
    const [challenge, setChallange] = useState("");
    const connect = async () => {
        const [acc] = await myAlgoConnect.connect({
            shouldSelectOneAccount: true
        });

        setAccount(acc);
    };
    const updateChallenge = (e) => {
        setChallange(e.target.value);
        setSignedTx("");
    };
    const sign = async () => {
        document.getElementById("status").innerHTML = "Transaction Status: ";
        try {
            const params = await algodClient.getTransactionParams().do();
            const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                suggestedParams: params,
                from: account.address,
                to: account.address,
                assetIndex: 120764329,
                amount: 1,
                note: encoder.encode(challenge)
            });

            const stx = await myAlgoConnect.signTransaction(txn.toByte());
            const b64Stx = Buffer.from(stx.blob).toString("base64");
            //const txBytes = Buffer.from(txn.toByte(), 'base64')
            const response = await algodClient.sendRawTransaction(stx.blob).do();

            setSignedTx(b64Stx);
            //setSignedTx(response);
            document.getElementById("status").innerHTML =
                "Transaction Status: Succesful";
        } catch (err) {
            console.error(err);
            document.getElementById("status").innerHTML =
                "Transaction Status: Failed";
        }
    };

    const assign = async () => {
        document.getElementById("status").innerHTML = "Transaction Status: ";
        try {
            let recieverAddress = prompt("Please enter receiver wallet address:", "");
            const params = await algodClient.getTransactionParams().do();
            const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                suggestedParams: params,
                from: account.address,
                to: recieverAddress,
                assetIndex: 120764329,
                amount: 1,
                note: encoder.encode(challenge)
            });

            const stx = await myAlgoConnect.signTransaction(txn.toByte());
            const b64Stx = Buffer.from(stx.blob).toString("base64");
            //const txBytes = Buffer.from(txn.toByte(), 'base64')
            const response = await algodClient.sendRawTransaction(stx.blob).do();
            setSignedTx(b64Stx);
            document.getElementById("status").innerHTML =
                "Transaction Status: Succesful";
        } catch (err) {
            console.error(err);
            document.getElementById("status").innerHTML =
                "Transaction Status: Failed";
        }
    };

    return (
        <div className="App">
            <h1>Signature verification</h1>
            <button disabled={account} onClick={connect}>
                connect
            </button>

            {account && (
                <>
                    <h2>Connected Account Name: {account.name}</h2>
                    <h2>Connected Address: {account.address}</h2>

                    <h2>Deploy Here</h2>
                    <input onChange={updateChallenge} value={challenge} />
                    <button disabled={!challenge} onClick={sign}>
                        Deploy
                    </button>

                    <h2>Assign here</h2>
                    <input onChange={updateChallenge} value={challenge} />
                    <button disabled={!challenge} onClick={assign}>
                        Assign
                    </button>
                    <h2 id="status">Transaction Status: </h2>
                </>
            )}
        </div>
    );
}

//Algo connect ----- end



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

class MainMenu extends Component {

    componentDidMount () {
        if (!this.props.wallet) {
            this.props.setWallet('')
            this.props.navigation('/')
            return 
        }

        if (!isUser) {
            alert('Account has not been registered yet!')
            this.props.navigation('/')
            return
        }
    }
    render() {
        const { wallet, setWallet, dataDistributer, dataAll, dataView, setDataView, setDataAssign, navigation } = this.props
        const walletAdmin = 'TKFWGIK3TTRU7C5GCZCTMLT6D5TML6BYVER54OCGFWSC443BUI2XLNDFOQ' //Manufacter

        if (wallet) {
            if (wallet === walletAdmin)
                isAdmin = true
            else {
                dataDistributer.forEach(distributer => {
                    if (wallet === distributer)
                        isDistributer = true
                })
            }
            if (isDistributer || isAdmin)
                isUser = true
        }

        if (!dataAll) {
            return (
                <div className="App">
                    <h1>Loading</h1>
                </div>
            )
        }

        if (isAdmin) {
            return (
                <div className="App">
                    <Api wallet={wallet} dataAll={dataAll} dataView={dataView} setDataView={setDataView} setDataAssign={setDataAssign} />

                    <h1>Instrument Check (Admin) </h1>
                    <button
                        onClick={() => {
                            // api call
                            // change to the about page
                            navigation('/Add')
                        }}
                    >Add</button>

                    <button
                        onClick={() => {
                            // api call
                            // change to the about page
                            navigation('/ViewAssign');
                        }}
                    >Assign</button>

                    <button
                        onClick={() => {
                            // api call
                            // change to the about page
                            navigation('/ViewAll');
                        }}
                    >View</button>

                    <button
                        onClick={() => {
                            // api call
                            // change to the about page
                            setWallet('')
                            setDataView('')
                            setDataAssign('')
                            reset()
                            navigation('/');
                        }}
                    >Logout</button>
                </div>
            )
        }

        if (isDistributer) {
            return (
                <div className="App">
                    <Api wallet={wallet} dataAll={dataAll} dataView={dataView} setDataView={setDataView} setDataAssign={setDataAssign} />

                    <h1>Instrument Check (Distributer)</h1>
                    <button
                        onClick={() => {
                            // api call
                            // change to the about page
                            navigation('/ViewAssign');
                        }}
                    >Assign</button>

                    <button
                        onClick={() => {
                            // api call
                            // change to the about page
                            navigation('/ViewAll');
                        }}
                    >View</button>

                    <button
                        onClick={() => {
                            // api call
                            // change to the about page
                            setWallet('')
                            setDataView('')
                            setDataAssign('')
                            reset()
                            navigation('/');
                        }}
                    >Logout</button>
                </div>
            )
        }


    }
};


const ViewAll = (props) => {
    if (isUser) {
        return (
            < div className="container" >
                <Table dataView={props.dataView} roles='user' navigation={props.navigation} />
            </div >
        )
    }

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

            <Li dataIns={props.dataIns} roles={props.roles} navigation={props.navigation} />
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


export { Apptest, Main, MainMenu, ViewAll, ViewAssign, ViewInstrument, Add, Assign, Detail };
