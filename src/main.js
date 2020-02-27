"Use strict"

import React, {Component} from "react"
import ReactDOM from 'react-dom'; 
import MyTable from './table'
import FiltrPanel from './filtr_panel'
import MyDialog from './dialog';


class Main extends Component 
{
	constructor(props)
			{
				super(props)
				this.state = {
								rows:   [
											{ 
												name: 'Загрузка данных с сервера...',
											}
										],
								sel_user_id: null,
								sel_user_name: null,
								sel_user_toDo: null,
								handleOnClick: this.handleOnTableClick,
								dialogOpened: false,
								filterByName: null,
								filterByWeb: null
				   			 }
				this.handleOnTableClick = this.handleOnTableClick.bind(this)
				this.onCheckFilterButton = this.onCheckFilterButton.bind(this)
				this.onResetFiltrs = this.onResetFiltrs.bind(this)
				this.onApplyFiltrs = this.onApplyFiltrs.bind(this)
				this.onDialogClose = this.onDialogClose.bind(this)
				this.OnDeleteUser = this.OnDeleteUser.bind(this)
		    }
		
	result_request = [];

	handleOnTableClick(id, name) 
	{  
		let tmp_toDo = id > 0? (this.result_request.filter(e => {return e.user_id===id}))[0].toDo : null;
		if(id > 0 && !tmp_toDo)
		{
			tmp_toDo = [ {title: "Загрузка данных с сервера..."} ];
			fetch('https://jsonplaceholder.typicode.com/todos?userId=' + id)
			.then( response => response.json())
			.then( json => { 
								tmp_toDo = [];
								json.map( (r) => { return tmp_toDo.push(	{	
																				id: r.id, 
																				title: r.title,
																				completed: r.completed																			}
																		);
												}
										);
								if(!tmp_toDo.length)
									tmp_toDo = [ {title: "Список задач для данного человека пуст.."} ];			
								this.setState( { sel_user_toDo: tmp_toDo } );
							}
				)
			.catch	( error => {
									tmp_toDo = [ { title: "Ошибка загрузки данных https://jsonplaceholder" } ];
									this.setState( { sel_user_toDo: tmp_toDo } )
								}	  
			  		)
		}

		this.setState( { 	
							sel_user_id : id, 
							sel_user_name: name, 
							dialogOpened : id ? true : false,
							sel_user_toDo: tmp_toDo
						}
					 );
	}
	
	onDialogClose(new_toDo)
	{
		let index = this.result_request.findIndex(item => {return item.user_id===this.state.sel_user_id});
		
		if(index >= 0)
		{
			this.result_request[index].toDo = new_toDo.filter(e=>e.id>0);
		}
		
		this.setState( { dialogOpened : false } ) 
	}

	/*componentDidUpdate()
	{}
	*/

	componentDidMount()
	{
	    fetch('https://jsonplaceholder.typicode.com/users')
		.then( response => response.json() )
		.then( json => { 
				   
							json.map( (r) => { return this.result_request.push(
																{	
																	user_id: r.id, 
																	name: r.name,
																	user_name: r.username,
																	email: r.email,
																	website: r.website,
																	toDo: null
																}
														);
												}
										);
							this.setState( { rows: this.result_request } )
						}
				
		     )
		.catch( error => this.setState( { rows: [{ 	name: "Ошибка загрузки данных https://jsonplaceholder (" + error + ")",
												}] 
										} 
									  )
									  /* здесь можно еще задизэблить фильтр-панель, но, наверное, это лишнее */					  
			  );

		ReactDOM.render(<FiltrPanel 
									onCheckFilterButton={this.onCheckFilterButton}
									onResetFiltrs={this.onResetFiltrs}
									onApplyFiltrs={this.onApplyFiltrs}
																		/>, document.querySelector('#filtr'));
	}

	render()
	{
		return (
					<React.Fragment>
						<MyTable 
							rows={this.state.rows}
							handleOnClick={this.handleOnTableClick}
							OnDeleteUser={this.OnDeleteUser}
						/> 
		  				{!this.state.dialogOpened ? "" : 
												<MyDialog 
													handleClose={this.onDialogClose}
													user_name={this.state.sel_user_name}
													user_toDo={this.state.sel_user_toDo}
												/>
						}
					</React.Fragment>
				)
	}
			 
	onResetFiltrs()
	{
		document.getElementById("filtr_by_name").value = "";
		document.getElementById("filtr_by_web").value = "";
		this.setState( 
						{
							filterByName: null,
							filterByWeb: null,
							rows: this.result_request 
						} )
	}
	
	onApplyFiltrs()
	{
		let filterByName = document.getElementById("filtr_by_name").value.toLowerCase();
		let filterByWeb = document.getElementById("filtr_by_web").value.toLowerCase();
		if(!filterByName && !filterByWeb)  
		{
			alert("Фильтры не заданы. Операция отменена.");
			return;
		}
		
		this.setState( { 	
							filterByName: filterByName,
							filterByWeb: filterByWeb,
							rows: this.result_request.filter( item => 	{ return (!filterByName || item.user_name.toLowerCase().indexOf(filterByName) >=0 ) && 
																				(!filterByWeb || item.website.toLowerCase().indexOf(filterByWeb) >=0) 
																		}
															) 
						}
					)
	}

	onCheckFilterButton(e)
	{
		const filterByName = this.state.filterByName;
		const filterByWeb = this.state.filterByWeb;
		
		this.setState(  {  rows: !(e.target.checked) ?  this.result_request
													 :  this.result_request.filter( item => { return (!filterByName || item.user_name.toLowerCase().indexOf(filterByName) >=0 ) && 
																												(!filterByWeb || item.website.toLowerCase().indexOf(filterByWeb) >=0) 
																							}
																				 ) 
						}
					 )
	}	

	OnDeleteUser(user_id)
	{
		let ind = this.result_request.findIndex(e=>e.user_id===user_id);
		
		if(ind >= 0)
			this.result_request.splice(ind, 1);
	
		this.setState( { rows: this.state.rows.filter(e=>e.user_id!==user_id) });
		//this.forceUpdate();
	}
}

export default Main