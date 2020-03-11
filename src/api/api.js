import service from "./service";

function getToken(data) {
    return service.post('***', data);
}

function getUsers(params) {
    return service.get('***', { params: params });
}

function getUserDetails(id) {
    return service.get('***/' + id + '/***');
}

function getUserOperationLogs(id, params) {
    return service.get('***/' + id + '/***', { params: params });
}

function getOperationLogs(params){
    return service.get('***', { params: params });
}

function getSessions(){
    return service.get('***');
}

function deleteSessionByUsername(username){
    return service.delete('***/' + username);
}

export { getToken, getUsers, getUserDetails, getUserOperationLogs, getOperationLogs, getSessions, deleteSessionByUsername }