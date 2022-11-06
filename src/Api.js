import React, { Component } from 'react'
import Table from './Table'

class Api extends Component {
    state = {
        data: [],
        getData: false
    }


    // Code is invoked after the component is mounted/inserted into the DOM tree.
    componentDidMount() {
        const _this = this;
        const { render_type } = _this.props
        var url
        if ({ render_type }.render_type === 'view_all' || { render_type }.render_type === 'view_assign') {
            url =
                'https://algoindexer.testnet.algoexplorerapi.io/v2/assets/120764329/transactions?address-role=sender&address=TKFWGIK3TTRU7C5GCZCTMLT6D5TML6BYVER54OCGFWSC443BUI2XLNDFOQ'
        } else if ({ render_type }.render_type === 'view_instrument') {
            const { index } = _this.props
            url =
                'https://algoindexer.testnet.algoexplorerapi.io/v2/assets/120764329/transactions?note-prefix=' + btoa({ index }.index)
        }

        const isAdmin = false

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
                var records = [];
                var av = []

                if ({ render_type }.render_type === 'view_instrument') { //if view ownership 
                    result.transactions.forEach(element => {
                        records.push(element);
                    });
                }

                else if ({ render_type }.render_type === 'view_all' || { render_type }.render_type === 'view_assign') { //if view all 
                    // console.log(result.transactions)
                    result.transactions.forEach((element, index, array) => {
                        // if (element["asset-config-transaction"])
                        //     return
                        if (index === (array.length - 1))
                            return

                        if (element["asset-transfer-transaction"].receiver === walletAdmin)
                            records.push(JSON.parse(atob(element.note)));
                    });

                }

                this.setState({ data: records })
                this.setState({ getData: true })

                if ({ render_type }.render_type === 'view_assign') {
                    this.setState({ getData: false })

                    url =
                        'https://algoindexer.testnet.algoexplorerapi.io/v2/assets/120764329/transactions?address=' + wallet // bob

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
                                        if (atob(elem[i].note) === instrument.ins_id) {
                                            if (elem[i]["asset-transfer-transaction"].receiver === wallet) {
                                                hasReceive = true
                                                break
                                            }
                                        }
                                    }

                                    //Check send
                                    for (let i = 0; i < elem.length - 1; i++) {
                                        if (atob(elem[i].note) === instrument.ins_id) {
                                            if (elem[i].sender === wallet) {
                                                hasSend = true
                                                break
                                            }
                                        }
                                    }
                                } else {
                                    hasReceive = true
                                    for (let i = 0; i < elem.length - 1; i++) {
                                        if (atob(elem[i].note) === instrument.ins_id) {
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

                            });
                            this.setState({ data: av })
                            this.setState({ getData: true })
                        })
                }
            })
    }

    render() {
        const { data, getData } = this.state;
        const { changePage, render_type } = this.props
        if (!{ getData }.getData)
            return <h5>Loading...</h5>

        if (!{ data }.data.length)
            return <h5>No data fetch!</h5>

        return (
            < div className="container" >
                <Table tableData={data} changePage={changePage} render_type={render_type} />
            </div >
        )
    }
}

export default Api