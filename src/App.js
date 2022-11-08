// import React, { Component } from 'react'
import { Route, Routes, useNavigate, useSearchParams} from "react-router-dom";

import {Main, Add, Assign, Detail, ViewAll, ViewAssign, ViewInstrument} from './Pages'

export default function App() {
    const navigate = useNavigate()
    const [url_param] = useSearchParams()

    return (
        <Routes>
            <Route path="/" element={<Main navigation={navigate}/>} />
            <Route path="ViewAll" element={ <ViewAll navigation={navigate}/>} />
            <Route path="ViewAssign" element={ <ViewAssign navigation={navigate}/> } />
            <Route path="ViewInstrument" element={ <ViewInstrument get_index={url_param} navigation={navigate}/> } />
            <Route path="Add" element={ <Add navigation={navigate}/>} />
            <Route path="Assign" element={ <Assign navigation={navigate}/>} />
            <Route path="Detail" element={ <Detail navigation={navigate}/>} />
            <Route path="*" element={<h1>404</h1>} />
        </Routes>
    );
  }

// class App extends Component {

//     render() {
//         return (
//             <BrowserRouter>
//                 <Routes>
//                     <Route path="/test" exact component={<Main />}> </Route>

//                     {/* <Route path="/about" exact component={About} />
//                     <Route path="/posts/:id" exact component={Post} />
//                     <Route path="/" render={() => <div>404</div>} /> */}
//                 </Routes>
//             </BrowserRouter >
//         )
//     }

// }


// state = {
//     page: '',
//     index: ''
// }

// changePage = (txt, index) => {
//     this.setState({
//         page: txt,
//         index: index
//     })
// }


// render() {
// }



// if (this.state.page === 'view_instrument') {
//     return (<Api changePage={this.changePage} index={this.state.index} render_type='view_instrument' />)

// }
// else if (this.state.page === 'view_all') {
//     return (
//         <div className="App">
//             {/* <h1>Hello, React!</h1> */}
//             <Api changePage={this.changePage} render_type='view_all' />
//         </div>
//     )
// }
// else if (this.state.page === 'view_assign') {
//     return (
//         <div className="App">
//             {/* <h1>Hello, React!</h1> */}
//             <Api changePage={this.changePage} render_type='view_assign' />
//         </div>
//     )
// } else if (this.state.page === 'assign') {
//     return (
//         <div className="App">
//             <h1>Here is assign page</h1>
//             <button onClick={() => this.changePage('view_assign', '')}>Back</button>
//         </div>
//     )
// } else if (this.state.page === 'add') {
//     return (
//         <div className="App">
//             <h1>Here is add instrument page</h1>
//             <button onClick={() => this.changePage('', '')}>Back</button>
//         </div>
//     )
// }