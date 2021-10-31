/** Handles sending mutation to graphQL with updated grid
 * @param grid
 * @param coordinates
 */

export const frameModHandler = async (grid, coordinates) => {
    const myHeaders = await new Headers();
    myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM1NzE4MzQ3fQ.mddFXMejjFMNh9bJv3zGNWT4N_cUKdqqcx9r-TkdFNs");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "grid": grid,
        "cell": coordinates
    });

    const requestOptions = {
        method: 'POST',
        headers:  myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:3000/mutate-grid/", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}


