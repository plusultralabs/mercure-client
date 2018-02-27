import keysConfig  = require( "../../config/pub.json");

export function getPubKey(_index?:number){
    let index;
    if (typeof _index === 'undefined' || _index > (<any> keysConfig).latest ){
        // use the latest available
        index = (<any> keysConfig).latest
    } else {
        index = _index
    }
    return (<any> keysConfig).pub_keys[index]
}
