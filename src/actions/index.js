import firebase from 'firebase';
import * as cns from '../consTypes'
import { notificationShow } from '../helpers'

var config = {
    apiKey: "AIzaSyDVIg4mbMcDPV5hyDgBB2hr73C_nI-9_d0",
    authDomain: "mis-series-9f0e3.firebaseapp.com",
    databaseURL: "https://mis-series-9f0e3.firebaseio.com",
    storageBucket: "mis-series-9f0e3.appspot.com",
    messagingSenderId: "328426994062"
};

firebase.initializeApp(config);

const showsRef = firebase.database().ref('/Series');
const episodesRef = firebase.database().ref('/Capitulos');

export function getAuth(){
    return function (dispatch,getState){
        firebase.auth().onAuthStateChanged(user =>{
            if(user){
                console.log(`Auth user: ${user.displayName}`)
                dispatch({type:cns.LOGIN_USER, payload:user})
            }else{
                console.log(`LogOut user: ${getState()}`)
                dispatch({type:cns.LOGIN_USER,payload:null})
            }
        
        })
    }

}


export function login(){
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/plus.login')

     return function(dispatch){
        firebase.auth().signInWithPopup(provider)
        .then( result => {
            console.log(`lOGIN WITH: ${result.user.email}`)
        })
        .catch(error => console.log(`Error ${error.code}: ${error.message}`))
    }
        
}

export function logout(){
    return function(dispatch){
        let user = firebase.auth().currentUser
        firebase.auth().signOut()
            .then(result => {
                console.log('Se eliminado '+ user.email)
            })
            .catch(error => console.log(`Error ${error.code}: ${error.message}`))
        }
}


export function getNotSeen(){
    return function(dispatch,getState){
        episodesRef.orderByChild('visto').equalTo(false).on('value', function(snapshot){
            
            if(snapshot.val() != null){
                snapshot.forEach(snap => {
                     if(!snap.val().notify){
                        notificationShow("Nuevo Capitulo :\r\n" + snap.val().name);
                    }
                })
  
                dispatch({type:cns.GET_NOTSEEN,payload:snapshot.val()})
            }else{dispatch({type:cns.GET_NOTSEEN,payload:[]})}   
        });
    }
}

export function getTvShows(){
    return function(dispatch,getState){
         showsRef.on('value', snapshot => {
            if(snapshot.val() != null){
                dispatch({type:cns.LIST_TVSHOWS, payload:snapshot.val()})
            }else{dispatch({type:cns.LIST_TVSHOWS, payload:[]})}
        });
 
    }
}
export function getEpisodes(showcode){
      return function(dispatch,getState){
        let code = showcode;
        episodesRef.orderByChild('seriecode').equalTo(code).on('value', snapshot => {
            if(snapshot.val() != null){
                dispatch({type:cns.LIST_TVEPISODES, payload:snapshot.val()})
             }else{dispatch({type:cns.LIST_TVEPISODES, payload:[]})}
         });
  
      }
  }

export function deleteShow(id){
    return function(dispatch,getState){
        if(confirm(`Seguro quieres eliminal la serie con codigo :${id}`)){
            return showsRef.child(id).remove()
                
        }
    }
}

export function newShow(code){
    return function(dispatch,getState){
        
        fetch(cns.BASE_URL_SERIE+code)
        .then((res)=>{
            return res.text();
        }).then((html)=> {
            
            let title = html.match(cns.REGEX_TITLE);
            if(title != null){
                console.log("Title : ",title[1])
            }else{
                notificationShow("Error : La serie no existe o no se encontraron datos : Title")
                return;
            }
            let img = html.match(cns.REGEX_POSTER);
            if(img != null){
                console.log("Poster : ",img[1])
            }else{
                notificationShow("Error : La serie no existe o no se encontraron datos : Poster")
                return;
            }
            const match = new RegExp(cns.REGEX_BASE_CAPS, "gim");
            let temps = 1;
            let myArray = []
            do {
                temps = myArray[3];
            }while ((myArray = match.exec(html)) !== null);

            let serie = {
                code:code,
                name:title[1],
                poster:img[1],
                temps:temps
            }

            showsRef.child(code).set(serie)
            notificationShow(`Serie añadida con exito! ${serie.title}`)
        });
      
    }
}

export function checkChapter(id,bool){
    return function(dispatch,getState){
        episodesRef.child(id).update({visto:bool,notify:true});
    }
}

export function checkAll(seriecode,bool){
    return function(dispatch,getState){
        episodesRef.orderByChild('seriecode').equalTo(seriecode).once('value',snapshot => {
            snapshot.forEach(snap =>{
                snap.ref.update(
                    {visto: bool,
				    notify: true}
                    )
                
            })
        })
    }
}
 

export function stopRef(type){
    switch(type){
        case cns.REF_SHOWS:
            console.log("Show Ref OFF");
            showsRef.off();
            break;
        case cns.REF_CHAPTERS:
            console.log("Episode Ref OFF");
            episodesRef.off();
            break;
        default:
            break;
    }
 
}
