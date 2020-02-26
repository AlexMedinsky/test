"Use strict"

import React, {Component} from "react"
import ReactDOM from 'react-dom'; 
import MyTable from './table'
import FiltrPanel from './filtr_panel'
import MyDialog from './dialog';


class Main extends Component 
{
	constructor()
			{
				super()
				this.state = {
								rows:   [
											{ 
												name: 'Загрузка данных https://jsonplaceholder ...',
											}
										],
								sel_user_id: null,
								sel_user_name: null,
								sel_user_toDo: null,
								handleOnClick: this.handleOnTableClick,
								dialogOpened: false
				   			 }
				this.handleOnTableClick = this.handleOnTableClick.bind(this)
				this.onResetFiltrs = this.onResetFiltrs.bind(this)
				this.onApplyFiltrs = this.onApplyFiltrs.bind(this)
				this.onDialogClose = this.onDialogClose.bind(this)
		    }
		
	result_request = [];

	handleOnTableClick(id, name) 
	{  
		var tmp_toDo = id > 0? (this.result_request.filter(e => {return e.user_id===id}))[0].toDo : null;
		if(id>0 && !tmp_toDo)
		{
			tmp_toDo = [];
			fetch('https://jsonplaceholder.typicode.com/todos?userId=' + id)
			.then( response => response.json() )
			.then( json => { 
								json.map( (r) => { return tmp_toDo.push(  {	
																				id: r.id, 
																				title: r.title,
																				completed: r.completed
																			}
																	);
													}
										);
								//alert('main: user_toDo.length:  ' + tmp_toDo.length);
								this.setState( { sel_user_toDo: tmp_toDo } );
								//alert('after main: user_toDo.length:  ' + tmp_toDo.length);
							}
				)
			.catch( 
					error => tmp_toDo.push( { title: "Ошибка загрузки данных https://jsonplaceholder (" + error + ")" } )	  
				  )
			.catch( 
					this.setState( { sel_user_toDo: tmp_toDo } )	  
				  )
		}

		this.setState(  { 	
							sel_user_id : id, 
							sel_user_name: name, 
							dialogOpened : id ? true : false 
						} 
					);
	}
	
	onDialogClose()
	{
		this.setState( { dialogOpened : false } ) 
	}

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
						/> 
		  				{!this.state.dialogOpened ? "" : 
												<MyDialog 
													handleClose={this.onDialogClose}
													user_id={this.state.sel_user_id}
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
		this.setState( { rows: this.result_request } )
	}
	onApplyFiltrs()
	{
		var filtrByName = document.getElementById("filtr_by_name").value.toLowerCase();
		var filtrBySite = document.getElementById("filtr_by_web").value.toLowerCase();
		/*if(!filtrByName && !filtrBySite)  
		{
			alert("необходимо указать фильтры!");
			return;
		}*/
		
		this.setState( { rows: this.result_request.filter( item => { return (!filtrByName || item.user_name.toLowerCase().indexOf(filtrByName) >=0 ) && 
																			(!filtrBySite || item.website.toLowerCase().indexOf(filtrBySite) >=0) 
																   }
														 ) 
					   } 
					 )
	}	
}

export default Main