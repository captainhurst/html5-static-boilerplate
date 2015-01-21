import JSO from 'jso'
import $ from 'jquery'

JSO.enablejQuery($)

var jso = new JSO({
    providerID: "github",
    client_id: "8060014c955e65db365e",
    // redirect_uri: "https://localhost:8000/#/login",
    authorization: "https://github.com/login/oauth/authorize",
    scopes: { request: [ "gist" ] }
})

export default jso