import React, { Component } from 'react'
import { createSearchParams } from "react-router-dom";

const TableHeader = (props) => {
    if (props.render_type === 'view_all') {
        return (
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>View</th>
                </tr>
            </thead>
        )
    } else if (props.render_type === 'view_assign') {
        return (
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Assign</th>
                </tr>
            </thead>
        )
    } else if (props.render_type === 'view_instrument') {
        return (
            <thead>
                <tr>
                    <th>Ownership</th>
                </tr>
            </thead>
        )
    }
}

const TableBody = (props) => {
    var first_row
    var rows
    //first row
    if (props.render_type === 'view_instrument') {
        // console.log(props.tableData)

        first_row = props.tableData.slice(0, 1).map((row, index) => {
            return (
                <tr key={index}>
                    <td>{row.sender}</td>
                </tr>
            )
        })

        rows = props.tableData.map((row, index) => {
            console.log(row)
            return (
                <tr key={index}>
                    {/* <td>{row.sender}</td> */}
                    <td>{row["asset-transfer-transaction"].receiver}</td>
                    {/* <td><button onClick={() => props.changePage("view", row.ins_id)}>View</button></td> */}
                </tr>
            )
        })
    } else if (props.render_type === 'view_all' || props.render_type === 'view_assign') {
        let page = props.render_type === 'view_all' ? '/ViewInstrument' : '/Assign'
        let page_txt = props.render_type === 'view_all' ? 'View' : 'Assign'
        rows = props.tableData.map((row, index) => {
            return (
                <tr key={index}>
                    <td>{row.ins_id}</td>
                    <td>{row.ins_name}</td>
                    <td>{row.ins_type}</td>
                    <td><button
                        onClick={() => {
                            // api call
                            // change to the about page
                            // alert('sd')
                            props.navigation(
                                {
                                    pathname: page,
                                    search: createSearchParams ({
                                        id: row.ins_id
                                    }).toString() 
                                }
                            );
                        }}>{page_txt}</button></td>
                </tr>
            )
        })
    }

    if (props.render_type === 'view_all' || props.render_type === 'view_assign') {
        return <tbody>{rows}</tbody>
    } else if (props.render_type === 'view_instrument') {
        return <tbody>{first_row}{rows}</tbody>
    }
}


class Table extends Component {

    render() {
        const { tableData, render_type, navigation } = this.props
        var button_page
        if ({ render_type }.render_type === 'view_all' || { render_type }.render_type === 'view_assign') {
            button_page = '/'
        } else {
            button_page = '/ViewAll'
        }
        return (


            <div className="display">
                <table>
                    <TableHeader render_type={render_type} />
                    <TableBody tableData={tableData} render_type={render_type} navigation={navigation}/>
                </table>
                {/* onClick={() => changePage({button_page}, '')} */}
                <button onClick={() => navigation(button_page)}>Back</button>
            </div>
        )
    }
}

export default Table
