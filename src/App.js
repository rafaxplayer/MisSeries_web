import React from 'react';
import Header from './components/Header';
import './styles/normalize.css';
import './styles/App.css';
import './styles/font-awesome.min.css'
import { connect } from 'react-redux';
import { store } from './store'
import ModalShows from 'react-modal';
import ModalDetails from 'react-modal';
import { MODAL_OPTIONS_ISOPEN,MODAL_DETAILS_ISOPEN } from './consTypes'
import { push } from 'react-router-redux'
import { getEpisodes, deleteShow } from './actions'
import { notificationShow } from './helpers'
const customStyles = {
  overlay :{
    backgroundColor : 'rgba(45, 43, 43, 0.74902)'
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    padding               : '0',
    marginRight           : '-50%',
    minWidth              : '350px',
    boxShadow             : '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    transform             : 'translate(-50%, -50%)'
  }
};
class App extends React.Component {
  
  onClickgetEpisodes(code){
      
      this.props.getEpisodes(code)
      this.closeModal(MODAL_OPTIONS_ISOPEN)
      store.dispatch(push('/show'))
  }

  openDetailsModal(){
     store.dispatch({
            type:MODAL_DETAILS_ISOPEN,
            payload:true
        })
      store.dispatch({
            type:MODAL_OPTIONS_ISOPEN,
            payload:false
        })  
  }

  closeModal(type){
    store.dispatch({
            type:type,
            payload:false
        })
  }
  
  deleteShow(id){
    const self = this;
    this.props.deleteShow(id)
      .then(function() {
          notificationShow("Ok serie eliminada con exito!")
          self.closeModal(MODAL_OPTIONS_ISOPEN)   
      })
      .catch(function(error) {
          notificationShow(`Remove failed: ${error.message}`)
      });
  }
 
  render() {
    const { showformodal, openModalOptions, openModalDetails, children} = this.props
    return (
          <div>
            <ModalShows
              isOpen={openModalOptions}
              onRequestClose={this.closeModal.bind(this,MODAL_OPTIONS_ISOPEN)}
              style={customStyles}
              contentLabel="Modal Options Shows">
              <div className="modal-header">
                <i className="fa fa-times fa-1x close-button" onClick={this.closeModal.bind(this,MODAL_OPTIONS_ISOPEN)}></i>
                <h3 ref="subtitle">{showformodal?showformodal.name:''}</h3>
              </div>
              <div className="modal-content">
              <ul className="modal-list">
                <li onClick={this.onClickgetEpisodes.bind(this,showformodal ? showformodal.code:'')}><i className="fa fa-film" aria-hidden="true"></i> Ver listado capitulos</li>
                <li onClick={this.openDetailsModal.bind(this)}><i className="fa fa-info-circle" aria-hidden="true"></i> Ver detalle serie</li>
                <li onClick={this.deleteShow.bind(this,showformodal ?showformodal.code:'')}><i className="fa fa-trash" aria-hidden="true"></i> Eliminar Serie</li>
              </ul>
              </div>
            </ModalShows>
            <ModalDetails
              isOpen={openModalDetails}
              onRequestClose={this.closeModal.bind(this,MODAL_DETAILS_ISOPEN)}
              style={customStyles}
              contentLabel="Modal Details Show">
              <div className="card">
                <figure>
                  <img src={showformodal ? showformodal.poster:''} alt=""/>
                </figure>
                <div className="info">
                  <h4>{showformodal ?showformodal.name:''}</h4>
                  <p>Temps : {showformodal ?showformodal.temps:''}</p>
                  <p>Code : {showformodal ?showformodal.code:''}</p>
                </div>
              </div>
            </ModalDetails>
            <Header/>
            {children}
          </div>
        );
    }
}
function mapStateToProps(state){
  return{
          openModalOptions:state.modals.options,
          openModalDetails:state.modals.details,
          showformodal:state.modals.showformodal
        }
}
export default connect( mapStateToProps ,{getEpisodes, deleteShow })(App);
