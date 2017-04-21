import React, { Component } from 'react';
import Switch from './Switch'

class ItemChapter extends Component {

    navigateChapterUrl(url){

        if(confirm("¿Seguro quieres visitar la pagina de este capítulo?")){
            window.open("https://seriesdanko.com/"+url)
        }

    }
    render() {
        const { episode } = this.props;
        return (<article className="item item-episode">
                    <h3>{episode.name}</h3>
                    
                    <Switch on={episode.visto} episode={episode}/>
                    <i className="fa fa-globe fa-2x" aria-hidden="true" onClick={this.navigateChapterUrl.bind(this,episode.url)}></i>
                </article>
        );
    }
}

export default ItemChapter;