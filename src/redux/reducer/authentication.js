import { combineReducers } from 'redux'


const init = {
    id: '',
    username: '',
    password: '',
    email: '',
    phone: null,
    alamat: '',
    kota: '',
    kodepos: null,
    role: ''

}

const initSearch = {
    keyword: ''
}

const initbadge = {
    badge: 0
}

const AuthReducer = (state = init, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            // Akan menyalin property di state untuk kemudian di ubah 'id' dan 'username'
            return {
                ...state,
                id: action.payload.id,
                username: action.payload.username,
                password: action.payload.password,
                email: action.payload.email,
                phone: action.payload.phone,
                alamat: action.payload.alamat,
                kota: action.payload.kota,
                kodepos: action.payload.kodepos,
                role: action.payload.role

            }

        // Hilangkan id dan username
        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                id: '',
                username: '',
                password: '',
                email: '',
                phone: null,
                alamat: '',
                kota: '',
                kodepos: null,
                role: ''


            }

        default:
            return state
    }
}

const SearchReducer = (state = initSearch, action) => {
    switch(action.type){
        case "SEARCH_SUCCESS":
            return {...state, keyword: action.payload.keyword}
        default:
            return state

    }
}

const reducer = combineReducers(
    {
        auth: AuthReducer,
        filter: SearchReducer
    }
)

export default reducer