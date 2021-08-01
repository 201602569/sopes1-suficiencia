import React, { Component,useEffect } from "react";
import { Table, SelectPicker } from "rsuite";
import socketIOClient from "socket.io-client";
//para correr de manera local, ir a la carpeta Sockets y correr comando node index.js
const ENDPOINT = "http://localhost:8080";


const { Column, HeaderCell, Cell } = Table;

export class MongoData extends Component{
    constructor(){
        super();
        this.state = {
            displayLength: 10,
            loading: false,
            page: 1,
            data: [],
            selectData: [
                { label: "Redis PubSub", value: "Redis PubSub" },
                { label: "KAFKA", value: "KAFKA" },
                { label: "GRPC", value: "GRPC" }
            ],
            value: null
        }
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeLength = this.handleChangeLength.bind(this);
        this.handleSortColumn = this.handleSortColumn.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value){
        this.setState({
            value
        })
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
        const { value, data, sortColumn, sortType, displayLength, page } = this.state;

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

        if(value != null){
            return data.filter((el) => {
                return el.origin === value;
            }).filter((v, i) => {
                const start = displayLength * (page - 1);
                const end = start + displayLength;
                return i >= start && i < end;
            });
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
            10000
        );
    }

    async increment(){
     
            const socket = socketIOClient(ENDPOINT);
            socket.on("Vacunados", response => {
              //setResponse(data);
              this.setState({
                data: response
            });
             
            });
           
        /*let response = await fetch('http://34.66.140.125:3000/getData', options)
            .then(response => response.json())
        this.setState({
            data: response
        });*/
    }

    render(){
        const data = this.getData();
        const { loading, displayLength, page, sortColumn, sortType } = this.state;

        return(
            <div style={{ marginTop: "10px" }}>
                <SelectPicker
                    placeholder="Select Origin"
                    size="lg"
                    data={this.state.selectData}
                    style={{ width: 250, marginBottom: 20 }}
                    searchable={false}
                    onChange={this.handleChange}
                />
                <Table
                    height={420}
                    data={data}
                    sortColumn={sortColumn}
                    sortType={sortType}
                    onSortColumn={this.handleSortColumn}
                    loading={loading}
                >
                    <Column align={"center"} width={200} align="center" sortable>
                        <HeaderCell>Name</HeaderCell>
                        <Cell dataKey="name" />
                    </Column>
                    <Column align={"center"} width={200} align="center" sortable>
                        <HeaderCell>Location</HeaderCell>
                        <Cell dataKey="location" />
                    </Column>
                    <Column align={"center"} width={200} align="center" sortable>
                        <HeaderCell>Gender</HeaderCell>
                        <Cell dataKey="gender" />
                    </Column>
                    <Column align={"center"} width={200} align="center" sortable>
                        <HeaderCell>Age</HeaderCell>
                        <Cell dataKey="age" />
                    </Column>
                    <Column align={"center"} width={200} align="center" sortable>
                        <HeaderCell>Vaccine Type</HeaderCell>
                        <Cell dataKey="vaccine_type" />
                    </Column>
                    <Column align={"center"} width={200} align="center" sortable>
                        <HeaderCell>Origin</HeaderCell>
                        <Cell dataKey="origin" />
                    </Column>
                </Table>
                <Table.Pagination
                    lengthMenu={[
                        {
                            value: 10,
                            label: 10,
                        },
                        {
                            value: 20,
                            label: 20
                        },
                    ]}
                    activePage={page}
                    displayLength={displayLength}
                    total={this.state.data.length}
                    onChangePage={this.handleChangePage}
                    onChangeLength={this.handleChangeLength}
                />
            </div>
        )
    }
}

export default MongoData;