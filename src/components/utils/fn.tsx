export function SearchInternet(query:string,new_tab:boolean){
    if(new_tab){
        console.log("That one triggered");
        window.open(query);
    }else{
        console.log("This one triggered");
        window.location.href=query;
    }
}