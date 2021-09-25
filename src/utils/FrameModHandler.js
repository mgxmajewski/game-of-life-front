/** Handles sending mutation to graphQL with updated grid
 * @param grid
 * @param coordinates
 */

export const frameModHandler = (grid, coordinates) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "grid": grid,
        "cell": coordinates
    });

    const requestOptions = {
        method: 'POST',
        mode: "no-cors",
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:3000/mutate-grid/", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}


