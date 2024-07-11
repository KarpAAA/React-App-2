
const ObjectHelpers = () => {
    function deepObjectCopy(obj: any){
        if(!obj) return null;
        return JSON.parse(JSON.stringify(obj));
    }

    return {deepObjectCopy}
}
 export default ObjectHelpers();