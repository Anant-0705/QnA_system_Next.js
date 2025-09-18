export default function profilePage({params}:any){
    return(
        <div>
            <h1>Profile</h1>
            <p className="text-4xl">Welcome to your profile page!{params.id}</p>
        </div>
    )
}