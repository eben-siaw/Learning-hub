const URL = "http://localhost:5050/";

export default {
    getCourses : ()=>{
        return fetch(URL + '/users/courses')
                .then(response=>{
                    if(response.status !== 401){
                        return response.json().then(data => data);
                    }
                    else
                        return {message : {msgBody : "UnAuthorized",msgError : true}};
                });
    } 

}