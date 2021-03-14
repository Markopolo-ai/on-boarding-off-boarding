import '../css/loginbox.css'

export default function LoginBox() {

    return (
        <div className="loginbox">
                
                <div className="name">
                    MARKOPOLO.AI
                </div>
                <input type="text" placeholder="email"/>
                <input type="password" placeholder="password"/>
     
                <button> Login </button>
            
            
        </div>
    );
}