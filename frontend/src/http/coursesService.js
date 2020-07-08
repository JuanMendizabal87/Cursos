import axios from "axios";

// export function createConcursos() {
//     return axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/concursos`, concurso);
// }

// export function searchConcursos() {
//     return axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/concursos/search`);
// }

// export function getConcursos() {
//     return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/concursos`);
// }

export function getConcursosByCategoria(categoria) {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/courses/?`, categoria);
}