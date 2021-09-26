/** Handles sending mutation to graphQL with updated grid
 * @param grid
 * @param coordinates
 */

export const frameModHandler = async (grid, coordinates) => {
    const myHeaders = await new Headers();
    myHeaders.append("Authorization", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkFudGhvbnkgVmFsaWQgVXNlciIsImlhdCI6MTQyNTQ3MzUzNX0.KA68l60mjiC8EXaC2odnjFwdIDxE__iDu5RwLdN1F2A");
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


