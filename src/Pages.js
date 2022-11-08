import Api from './Api'

const Main = (props) => {

    return (

        <div className="App">
            <h1>Instrument Check</h1>
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
        </div>
    )
};


const ViewAll = (props) => {
    return (
        <Api render_type='view_all' navigation={props.navigation} />
    )
};

const ViewAssign = (props) => {
    return (
        <Api render_type='view_assign' navigation={props.navigation} />
    )
};

const ViewInstrument = (props) => {
    return (
        <Api render_type='view_instrument' index={props.get_index.get('id')} navigation={props.navigation} />
    )
};

const Add = (props) => {
    return (
        <div className="add">
            <h1>This is add page</h1>
            <button onClick={() => props.navigation('/')}>Back</button>
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


export { Main, ViewAll, ViewAssign, ViewInstrument, Add, Assign, Detail };