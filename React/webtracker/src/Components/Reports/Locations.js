import React, { Component } from "react";
import { Table, Row, Col } from "rsuite";

const { Column, HeaderCell, Cell } = Table;

export class Locations extends Component{
    constructor(){
        super();
        this.state = {
            displayLength: 10,
            loading: false,
            page: 1,
            data: []
        }
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeLength = this.handleChangeLength.bind(this);
        this.handleSortColumn = this.handleSortColumn.bind(this);
    }

    handleChangePage(dataKey){
        this.setState({
            page: dataKey
        });
    }

    handleChangeLength(dataKey){
        this.setState({
            page: 1,
            displayLength: dataKey
        });
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeLength = this.handleChangeLength.bind(this);
        this.handleSortColumn = this.handleSortColumn.bind(this);
    }

    handleSortColumn(sortColumn, sortType){
        this.setState({
            loading: true
        });

        setTimeout(() => {
            this.setState({
                sortColumn,
                sortType,
                loading: false
            });
        }, 500)
    }

    getData(){
        const { data, sortColumn, sortType, displayLength, page } = this.state;

        if(sortColumn && sortType){
            return data.sort((a, b) => {
                let x = a[sortColumn];
                let y = b[sortColumn];
                if (typeof x === 'string') {
                  x = x.charCodeAt();
                }
                if (typeof y === 'string') {
                  y = y.charCodeAt();
                }
                if (sortType === 'asc') {
                  return x - y;
                } else {
                  return y - x;
                }
              }).filter((v, i) => {
                const start = displayLength * (page - 1);
                const end = start + displayLength;
                return i >= start && i < end;
              })
        }

        return data.filter((v, i) => {
            const start = displayLength * (page - 1);
            const end = start + displayLength;
            return i >= start && i < end;
        });
    }

    componentDidMount(){
        this.increment();
        this.timer = setInterval(
            () => this.increment(),
            5000
        )
    }

    async increment(){
        const options = {
            method: 'GET', headers: {
                'Content-Type' : 'application/json'
            }
        }
        let response = await fetch('https://us-central1-core-silicon-306401.cloudfunctions.net/Locations', options)
            .then(response => response.json())
            .then(data => {
                return data;
            })
        this.setState({
            data: response
        });
    }

    render(){
        const data = this.getData();
        const { loading, displayLength, page, sortColumn, sortType } = this.state;
        return(
            <>
                <Table
                    height={400}
                    data={data}
                    sortColumn={sortColumn}
                    sortType={sortType}
                    onSortColumn={this.handleSortColumn}
                    loading={loading}
                >
                    <Column width={"50%"} align={"center"} align="center" sortable>
                        <HeaderCell>Location</HeaderCell>
                        <Cell dataKey="location" />
                    </Column>
                    <Column width={"50%"} align={"center"} align="center" sortable>
                        <HeaderCell>Total</HeaderCell>
                        <Cell dataKey="total" />
                    </Column>
                </Table>
                <Table.Pagination
                    lengthMenu={[
                        {
                            value: 10,
                            label: 10
                        },
                        {
                            value: 20,
                            label: 20
                        }
                    ]}
                    activePage={page}
                    displayLength={displayLength}
                    total={this.state.data.length}
                    onChangeLength={this.handleChangeLength}
                    onChangePage={this.handleChangePage}
                />
            </>
        )
    }
}

export default Locations;