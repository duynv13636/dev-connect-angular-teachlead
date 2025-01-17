export type ProjectType ={
    _id:string
    name:string,
    description:string,
    readme:string,
    originator:{
        _id?:string,
        name:string
    }
}