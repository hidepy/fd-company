export default class CommonUtils2{

    onTextChange(propKey){

        console.log(this)
        console.log("a")
    
        return event=> this.setState({ [propKey]: event.target.value })
    }
    

}