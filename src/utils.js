export const userAuth = {
    isAuthenticated : ()=>{
        let accessToken = localStorage.getItem('accessToken');
        return !!accessToken;
    }
}