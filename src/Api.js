import React, { Component } from 'react'
// import { json } from 'react-router-dom';
import Table from './Table'

class Api extends Component {
    state = {
        data: [],
        data_distributer: [],
        getData: false
    }


    componentDidMount() {
        const asset_id = '121415136'
        const _this = this;
        const { render_type } = _this.props
        var url

        if ({ render_type }.render_type === 'view_all' || { render_type }.render_type === 'view_assign') {
            url =
                'https://algoindexer.testnet.algoexplorerapi.io/v2/assets/' + asset_id + '/transactions?address-role=sender&address=TKFWGIK3TTRU7C5GCZCTMLT6D5TML6BYVER54OCGFWSC443BUI2XLNDFOQ'
        } else if ({ render_type }.render_type === 'view_instrument') {
            const { index } = _this.props
            const base_txt = "serial_id:"

            url =
                'https://algoindexer.testnet.algoexplorerapi.io/v2/assets/' + asset_id + '/transactions?note-prefix=' + btoa(base_txt + { index }.index)
        }

        const isAdmin = true

        const walletAdmin = 'TKFWGIK3TTRU7C5GCZCTMLT6D5TML6BYVER54OCGFWSC443BUI2XLNDFOQ'

        // alice:
        // TKFWGIK3TTRU7C5GCZCTMLT6D5TML6BYVER54OCGFWSC443BUI2XLNDFOQ

        // bob:
        // UOUTANWCKCKCVGNERCTD5HJILD6JLAYRUQIN4IZWHW5PS4ZHGSJWHQIVUY

        // choco:
        // 43M32JQKI5BU2L3K5AYJPJGSOPXOJ3GM57D3VCXHRA42BVHV6PBRQZ7DGI

        const walletUser = 'UOUTANWCKCKCVGNERCTD5HJILD6JLAYRUQIN4IZWHW5PS4ZHGSJWHQIVUY'
        var wallet = isAdmin ? walletAdmin : walletUser


        fetch(url)
            .then((result) => result.json())
            .then((result) => {
                var records = []
                var dist = []
                var records_view = []
                var records_owner = []
                var av = []


                if ({ render_type }.render_type === 'view_instrument') { //if view ownership 
                    result.transactions.forEach(element => {
                        records_owner.push(element);
                    });
                    this.setState({ data: records_owner })
                    this.setState({ getData: true })
                }

                if ({ render_type }.render_type === 'view_assign' || { render_type }.render_type === 'view_all') {
                    // fetch item all 
                    result.transactions.forEach((element, index, array) => {
                        // if (element["asset-config-transaction"])
                        //     return
                        if (index === (array.length - 1))
                            return

                        if (element["asset-transfer-transaction"].receiver === walletAdmin) {
                            let json_note
                            try {
                                json_note = JSON.parse(atob(element.note))
                                records.push(json_note)
                            } catch (e) {
                                let dist_elem = atob(element.note).split('distributer:')[1]
                                if (dist_elem) dist.push(dist_elem)

                                // let temp_dist = atob(element.note).split(',')
                                // let first_index = temp_dist[0]
                                // let last_index = temp_dist[temp_dist.length - 1]
                                // if ((first_index === 'start' && last_index === 'end') || (first_index === 'cont' && last_index === 'end')) {
                                //     dist_end = true
                                // }
                                // temp_dist.shift()
                                // temp_dist.pop()

                                // temp_dist.forEach(elem => {
                                //     dist.push(elem)
                                // });

                            }
                            this.setState({ data_distributer: dist })
                        }
                    });

                    url =
                        'https://algoindexer.testnet.algoexplorerapi.io/v2/assets/' + asset_id + '/transactions?address=' + wallet // bob

                    fetch(url)
                        .then((result) => result.json())
                        .then((result) => {
                            // console.log(result.transactions)
                            var elem = result.transactions
                            records.forEach((instrument) => {
                                var hasReceive = false
                                var hasSend = false

                                if (!isAdmin) {
                                    //Check receive 
                                    for (let i = 0; i < elem.length - 1; i++) {
                                        if (atob(elem[i].note).split('serial_id:')[1] === instrument.ins_id) {
                                            if (elem[i]["asset-transfer-transaction"].receiver === wallet) {
                                                hasReceive = true
                                                break
                                            }
                                        }
                                    }

                                    //Check send
                                    for (let i = 0; i < elem.length - 1; i++) {
                                        if (atob(elem[i].note).split('serial_id:')[1] === instrument.ins_id) {
                                            if (elem[i].sender === wallet) {
                                                hasSend = true
                                                break
                                            }
                                        }
                                    }

                                } else {
                                    hasReceive = true
                                    for (let i = 0; i < elem.length - 1; i++) {
                                        if (atob(elem[i].note).split('serial_id:')[1] === instrument.ins_id) {
                                            if (elem[i]["asset-transfer-transaction"].receiver !== wallet) {
                                                hasSend = true
                                                break
                                            }
                                        }
                                    }
                                }


                                //append available
                                if (hasReceive && !hasSend)
                                    av.push(instrument);

                                if (hasReceive)
                                    records_view.push(instrument)

                            });
                            console.log(this.state.data_distributer)
                            if ({ render_type }.render_type === 'view_assign')
                                this.setState({ data: av })
                            else
                                this.setState({ data: records_view })

                            this.setState({ getData: true })
                        })
                }
            })
    }


    render() {
        const { data, getData } = this.state;
        const { render_type, navigation } = this.props

        if (!{ getData }.getData)
            return <h5>Loading...</h5>

        if (!{ data }.data.length) {
            if ({ render_type }.render_type === 'view_instrument') {
                return (
                    < div className="container" >
                        <Table tableData={[]} render_type={render_type} navigation={navigation} />
                    </div >
                )
            }

            return <h5>No data fetch!</h5>
        }


        return (
            < div className="container" >
                <Table tableData={data} render_type={render_type} navigation={navigation} />
            </div >
        )
    }
}

export default Api