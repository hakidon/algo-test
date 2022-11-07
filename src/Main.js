import { useNavigate } from "react-router-dom";

const Main = () => {
    const navigate = useNavigate()

    return (

        <div className="App">
            <h1>Instrument Check</h1>
            <button
                onClick={() => {
                    // api call
                    // change to the about page
                    navigate('/Add')
                }}
            >Add</button>

            <button
                onClick={() => {
                    // api call
                    // change to the about page
                    navigate('/ViewAssign');
                }}
            >Assign</button>

            <button
                onClick={() => {
                    // api call
                    // change to the about page
                    navigate('/ViewAll');
                }}
            >View</button>
        </div>
    )
};

export default Main;

// class Main extends Component {
//     render() {
//        return(<h1>tes</h1>)
//     }
// }

// export default Main

// const { history } = this.props
// return (
//     <div className="App">
//         <h1>Instrument Check</h1>
//         <button
//             onClick={() => {
//                 // api call
//                 // change to the about page
//                 history.push("/");
//             }}
//         >Add</button>

//         <button
//             onClick={() => {
//                 // api call
//                 // change to the about page
//                 history.push("/ViewAssign");
//             }}
//         >Assign</button>

//         <button
//             onClick={() => {
//                 // api call
//                 // change to the about page
//                 history.push("/ViewAll");
//             }}
//         >View</button>
//     </div>
// )