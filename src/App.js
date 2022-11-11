// import React, { Component } from 'react'
import { Route, Routes, useNavigate, useSearchParams} from "react-router-dom";
import { useState } from 'react';
import {Main, MainMenu, Add, Assign, Detail, ViewAll, ViewAssign, ViewInstrument} from './Pages' 

export default function App() {
    const navigate = useNavigate()
    const [url_param] = useSearchParams()

    var [dataAll, setDataAll] = useState();
    var [dataView, setDataView] = useState();
    var [dataAssign, setDataAssign] = useState();
    var [dataIns, setDataIns] = useState();
    var [wallet, setWallet] = useState();
    var [dataDistributer, setDataDistributer] = useState();

    console.log(dataIns)
    return (
        <Routes>
            <Route path="/" element={<Main setWallet = {setWallet} setDataAll={setDataAll} setDataDistributer={setDataDistributer} navigation={navigate}/>} />
            <Route path="MainMenu" element={<MainMenu  wallet={wallet} setWallet = {setWallet} dataDistributer={dataDistributer} dataAll = {dataAll} dataView = {dataView} setDataView = {setDataView} setDataAssign = {setDataAssign} navigation={navigate}/>} />
            <Route path="ViewAll" element={ <ViewAll dataView={dataView} navigation={navigate}/>} />
            <Route path="ViewAssign" element={ <ViewAssign dataAssign={dataAssign} navigation={navigate}/> } />
            <Route path="ViewInstrument" element={ <ViewInstrument dataIns={dataIns} setDataIns={setDataIns} index={url_param.get('id')} navigation={navigate}/> } />
            <Route path="Add" element={ <Add navigation={navigate}/>} />
            <Route path="Assign" element={ <Assign navigation={navigate}/>} />
            <Route path="Detail" element={ <Detail navigation={navigate}/>} />
            <Route path="*" element={<h1>404</h1>} />
        </Routes>
    );
  }